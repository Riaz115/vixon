import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBusinesses,
  updateCertificateState,
} from "../redux/businessSlice";
import * as Yup from "yup";
import { deleteUrl, getBusiness, updateBusiness } from "../api/business";
import axios from "axios";
import { Loader } from "../Components/Loader/loader";
import { serverUrl } from "../config";
import { useTranslation } from "react-i18next";

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
export default function AddBusiness() {
  const { t } = useTranslation("addbussiness");
  const dispatch = useDispatch();
  const [businessData, setBusinessData] = useState(null);
  const business = useSelector(selectBusinesses);
  const [loading, setLoading] = useState(false);
  const [loadingFields, setLoadingFields] = useState({});

  const [editableFields, setEditableFields] = useState({
    passIdentifier: false,
    keyId: false,
    teamIdentifier: false,
    signerKeyPassPhrase: false,
  });

  const validationSchema = Yup.object({
    passIdentifier: Yup.string()
      .required("Pass Identifier is required")
      .min(3, "Pass Identifier must be at least 3 characters"),

    keyId: Yup.string()
      .required("Key ID is required")
      .min(3, "Key ID must be at least 3 characters"),

    signerKeyPassPhrase: Yup.string()
      .required("Signer Key Pass Phrase is required")
      .min(3, "Signer Key Pass Phrase must be at least 3 characters"),

    teamIdentifier: Yup.string()
      .required("Team Identifier is required")
      .min(3, "Team Identifier must be at least 3 characters"),

    signerCert: Yup.object({
      key: Yup.string().required("SignerCert is required"),
    })
      .nullable()
      .required("SignerCert is required"),

    signerKey: Yup.object({
      key: Yup.string().required("SignerKey is required"),
    })
      .nullable()
      .required("SignerKey is required"),

    wwdrp: Yup.object({
      key: Yup.string().required("WWDRP is required"),
    })
      .nullable()
      .required("WWDRP is required"),

    AuthKey: Yup.object({
      key: Yup.string().required("AuthKey is required"),
    })
      .nullable()
      .required("AuthKey_94Q68VCF4A is required"),
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getBusiness(business.activeLocation.toString());
      setBusinessData(data);
    };
    fetchData();
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return null;

    try {
      const fileName = `certificates/${businessData.activeLocation.toString()}/${
        file.name
      }`;
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

      const { data: initiateResponse } = await axios.post(
        `${serverUrl}/api/media/initiate-upload`,
        { fileName, filetype: file.type || "image/heic" }
      );

      const uploadId = initiateResponse.response.UploadId;
      let start = 0;
      const chunks = [];

      for (let i = 1; i <= totalChunks; i++) {
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
        chunks.push({ chunk });
        start = end;
      }

      for (let i = 0; i < chunks.length; i++) {
        const { data: presignedResponse } = await axios.post(
          `${serverUrl}/api/media/generate-presigned-url`,
          {
            fileName,
            partNumber: i + 1,
            uploadId,
            filetype: file.type || "image/heic",
          }
        );

        await fetch(presignedResponse.url, {
          method: "PUT",
          body: chunks[i].chunk,
          headers: {
            "Content-Type": file.type,
            "Content-Length": chunks[i].chunk.size,
          },
        });
      }

      const { data: completeResponse } = await axios.post(
        `${serverUrl}/api/media/complete-upload`,
        { fileName, uploadId }
      );

      if (!completeResponse.success) throw new Error("Upload failed");

      return completeResponse.data;
    } catch (error) {
      console.error("Error uploading file:", error.message);
      return null;
    }
  };

  const toggleEdit = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        passIdentifier: values.passIdentifier,
        teamIdentifier: values.teamIdentifier,
        signerKeyPassPhrase: values.signerKeyPassPhrase,
        keyId: values.keyId,
        signerCert: {
          location: values.signerCert.location,
          key: values.signerCert.key,
        },
        signerKey: {
          location: values.signerKey.location,
          key: values.signerKey.key,
        },
        allFieldFill: true,
        wwdrp: { location: values.wwdrp.location, key: values.wwdrp.key },
        AuthKey: {
          location: values.AuthKey.location,
          key: values.AuthKey.key,
        },
      };

      const id = businessData.activeLocation;
      const response = await updateBusiness(payload, id);

      if (response.data.success) {
        dispatch(updateCertificateState(true));
        alert("Business updated successfully!");
        // resetForm();
        // setBusinessData(null);
        setEditableFields({
          passIdentifier: false,
          keyId: false,
          teamIdentifier: false,
          signerKeyPassPhrase: false,
        });
      } else {
        throw new Error("Failed to update business");
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const handleDelete = async (fileKey, field) => {
    try {
      if (!fileKey) {
        console.error("File key is missing");
        return;
      }

      setLoading(true);
      const id = businessData.activeLocation;
      const payload = {
        filename: fileKey,
        id: id,
        fieldName: field,
      };

      const response = await deleteUrl(payload);

      if (response?.data?.success) {
        dispatch(updateCertificateState(false));
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{t("editbuss")}</h2>
      {businessData ? (
        <Formik
          initialValues={{
            passIdentifier: businessData.passIdentifier || "",
            teamIdentifier: businessData.teamIdentifier || "",
            signerKeyPassPhrase: businessData.signerKeyPassPhrase || "",
            keyId: businessData.keyId || "",
            signerCert: businessData.signerCert || { location: "", key: "" },
            signerKey: businessData.signerKey || { location: "", key: "" },
            wwdrp: businessData.wwdrp || { location: "", key: "" },
            AuthKey: businessData.AuthKey || {
              location: "",
              key: "",
            },
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, values, isValid }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="passIdentifier">{t("passidentifier")}:</label>
                <div className="flex">
                  <Field
                    name="passIdentifier"
                    type="text"
                    className="border p-2 w-full"
                    disabled={!editableFields.passIdentifier}
                  />
                  {editableFields.passIdentifier ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-blue-500 text-white ml-2"
                      onClick={() => toggleEdit("passIdentifier")}
                    >
                      {t("edit")}
                    </button>
                  )}
                </div>
                <ErrorMessage
                  name="passIdentifier"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="keyId">{t("keyid")}:</label>
                <div className="flex">
                  <Field
                    name="keyId"
                    type="text"
                    className="border p-2 w-full"
                    disabled={!editableFields.keyId}
                  />
                  {editableFields.keyId ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-blue-500 text-white ml-2"
                      onClick={() => toggleEdit("keyId")}
                    >
                      {t("edit")}
                    </button>
                  )}
                </div>
                <ErrorMessage
                  name="keyId"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="teamIdentifier">{t("teamidentifier")}:</label>
                <div className="flex">
                  <Field
                    name="teamIdentifier"
                    type="text"
                    className="border p-2 w-full"
                    disabled={!editableFields.teamIdentifier}
                  />
                  {editableFields.teamIdentifier ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-blue-500 text-white ml-2"
                      onClick={() => toggleEdit("teamIdentifier")}
                    >
                      {t("edit")}
                    </button>
                  )}
                </div>
                <ErrorMessage
                  name="teamIdentifier"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="signerKeyPassPhrase">{t("signkey")}:</label>
                <div className="flex">
                  <Field
                    name="signerKeyPassPhrase"
                    type="text"
                    className="border p-2 w-full"
                    disabled={!editableFields.signerKeyPassPhrase}
                  />
                  {editableFields.signerKeyPassPhrase ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-blue-500 text-white ml-2"
                      onClick={() => toggleEdit("signerKeyPassPhrase")}
                    >
                      {t("edit")}
                    </button>
                  )}
                </div>
                <ErrorMessage
                  name="signerKeyPassPhrase"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {["signerCert", "signerKey", "wwdrp", "AuthKey"].map((field) => (
                <div key={field}>
                  <label htmlFor={field}>{field}:</label>
                  <div className="flex items-center">
                    {!values?.[field]?.key && (
                      <input
                        type="file"
                        id={field}
                        className="hidden"
                        onChange={async (event) => {
                          const file = event.target.files[0] || null;
                          let data = {};
                          if (file) {
                            setLoadingFields((prev) => ({
                              ...prev,
                              [field]: true,
                            }));
                            try {
                              data = await handleFileUpload(file);
                              setFieldValue(field, null);
                            } catch (error) {
                              console.error("Error uplaoding field:", error);
                            } finally {
                              setLoadingFields((prev) => ({
                                ...prev,
                                [field]: false,
                              }));
                            }

                            if (data?.Location) {
                              setFieldValue(field, {
                                location: data.Location,
                                key: data.Key,
                              });
                              // console.log("Set value for field:", field, {
                              //   location: data.Location,
                              //   key: data.Key,
                              // });
                            }
                            event.target.value = "";
                          }
                        }}
                      />
                    )}

                    <span className="flex-1">
                      {values?.[field]?.key ? (
                        <span>{values?.[field]?.key}</span>
                      ) : (
                        <span>{t("nokeyav")}</span>
                      )}
                    </span>
                    {!values?.[field]?.key &&
                      (loadingFields[field] ? (
                        <div className="spinner2"></div>
                      ) : (
                        <button
                          type="button"
                          className="ml-2 text-blue-500"
                          onClick={() => {
                            const fileInput = document.getElementById(field);
                            if (fileInput) {
                              fileInput.click();
                            } else {
                              console.error(
                                `Element with id "${fileInput}" not found.`
                              );
                            }
                          }}
                        >
                          {t("upload")}
                        </button>
                      ))}

                    {values?.[field]?.key &&
                      (loadingFields[field] ? (
                        <div className="spinner2"></div>
                      ) : (
                        <button
                          type="button"
                          className="ml-2 text-red-500"
                          onClick={async () => {
                            setLoadingFields((prev) => ({
                              ...prev,
                              [field]: true,
                            }));
                            try {
                              await handleDelete(values?.[field]?.key, field);
                              setFieldValue(field, null);
                            } catch (error) {
                              console.error("Error deleting field:", error);
                            } finally {
                              setLoadingFields((prev) => ({
                                ...prev,
                                [field]: false,
                              }));
                            }
                          }}
                        >
                          {t("delete")}
                        </button>
                      ))}
                  </div>
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="text-red-500"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={
                  !(
                    editableFields.signerKeyPassPhrase ||
                    editableFields.teamIdentifier ||
                    editableFields.keyId ||
                    editableFields.passIdentifier ||
                    (isValid &&
                      values.signerCert.key &&
                      values.signerKey.key &&
                      values.wwdrp.key &&
                      values.AuthKey.key)
                  )
                }
                className={`px-4 py-2 rounded ${
                  !(
                    editableFields.signerKeyPassPhrase ||
                    editableFields.teamIdentifier ||
                    editableFields.keyId ||
                    editableFields.passIdentifier ||
                    (isValid &&
                      values.signerCert.key &&
                      values.signerKey.key &&
                      values.wwdrp.key &&
                      values.AuthKey.key)
                  )
                    ? "bg-gray-500"
                    : "bg-blue-500"
                } text-white`}
              >
                {t("savechanges")}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Loader loading={true} />
      )}
    </div>
  );
}
