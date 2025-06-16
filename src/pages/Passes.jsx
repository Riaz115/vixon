import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
} from "react";
import { PhoneEmulator } from "../Components/PhoneEmulator";
import { FaPowerOff } from "react-icons/fa";
import { GrDocumentDownload } from "react-icons/gr";
import { BiCopyAlt } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { CiPower } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  AddNewstamp,
  deletestamp,
  updatestamps,
  selectstamps,
} from "../redux/stampSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Components/Loader/loader";
import StylishLoader from "../Components/modal/StylishLoader";
import DeleteCardModal from "../Components/modal/DeleteConfirmationModal";
import CopycardModal from "../Components/modal/CopycardModal";
import ActivecardModal from "../Components/modal/ActivecardModal";
import { deleteStamp, copyStamp, activeStamp } from "../api/createstamp";
import DefaultCardContent from "./DefaultCardContent";
import { routeMa } from "../data";
import toast from "react-hot-toast";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import PDFGeneratorWithLoader from "../utils/prePdf";
import { useTranslation } from "react-i18next";

export default function Passes() {
  const allstamps = useSelector(selectstamps);
  const dispatch = useDispatch();

  const { t } = useTranslation("card");
  // Global loading state. (Used also when doing API operations: delete, copy, active)
  const [loading, setLoading] = useState(false);

  // Loader for specific buttons (like PDF generating)
  const [buttonloader, setButtonloader] = useState({});

  const [open, setOpen] = useState(false);
  const [opencopy, setOpencopy] = useState(false);
  const [openactive, setOpenactive] = useState(false);
  const [singlestamp, setSingleStamp] = useState(null);

  // Local list for ordering the passes.
  const [components, setComponents] = useState([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const containerRef = useRef(null);

  // Save the order of passes (by id) in localStorage.
  const persistOrder = useCallback((orderedArray) => {
    localStorage.setItem("passOrder", JSON.stringify(orderedArray));
  }, []);

  // ------------------ Ordering Effect ------------------ //
  useEffect(() => {
    if (!allstamps) return;
    const storedOrder = localStorage.getItem("passOrder");
    if (storedOrder) {
      const orderIds = JSON.parse(storedOrder); // e.g., ["1", "5", "2"]
      // Build array of stamps that already have order stored
      const orderedStamps = orderIds
        .map((id) => allstamps.find((stamp) => stamp.id === id))
        .filter(Boolean); // in case a stamp was removed
      // The rest are the new stamps; put them in front so that new passes appear at top.
      const newStamps = allstamps.filter(
        (stamp) => !orderIds.includes(stamp.id)
      );
      setComponents([...newStamps, ...orderedStamps]);
    } else {
      // If there is no stored order yet, simply use the stamps provided.
      setComponents(allstamps);
    }
  }, [allstamps]);

  // ------------------ Drag Handlers (Optimized) ------------------ //

  // Throttle drag handler to avoid too many scroll events.
  const isThrottling = useRef(false);
  const handleDrag = useCallback((e) => {
    if (isThrottling.current) return;
    isThrottling.current = true;
    const margin = 50; // pixels from the top or bottom
    const scrollSpeed = 20; // adjust as needed
    if (e.clientY < margin) {
      window.scrollBy(0, -scrollSpeed);
    } else if (e.clientY > window.innerHeight - margin) {
      window.scrollBy(0, scrollSpeed);
    }
    setTimeout(() => {
      isThrottling.current = false;
    }, 50); // throttle delay
  }, []);

  // Start drag: store the index and add drag event listener.
  const handleDragStart = useCallback((e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.setDragImage(e.target, 140, 200);
    document.addEventListener("dragover", handleDrag);
  }, [handleDrag]);

  // End drag: remove the event listener.
  const handleDragEnd = useCallback((e) => {
    document.removeEventListener("dragover", handleDrag);
  }, [handleDrag]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  // When an item is dropped, swap the items and persist the new order.
  const handleDrop = useCallback(
    (index) => {
      if (
        draggedItemIndex === null ||
        draggedItemIndex === undefined ||
        index < 0 ||
        index >= components.length ||
        draggedItemIndex < 0 ||
        draggedItemIndex >= components.length
      ) {
        console.error("Invalid drop operation.");
        return;
      }
      const updatedComponents = [...components];
      // Swap dragged item with target item.
      [updatedComponents[draggedItemIndex], updatedComponents[index]] = [
        updatedComponents[index],
        updatedComponents[draggedItemIndex],
      ];
      setComponents(updatedComponents);
      persistOrder(updatedComponents.map((item) => item.id));
      setDraggedItemIndex(null);
    },
    [components, draggedItemIndex, persistOrder]
  );

  // ------------------ API Operations ------------------ //

  const generate = useCallback(async (data) => {
    if (data) {
      setButtonloader((prevState) => ({
        ...prevState,
        [data.id]: true,
      }));

      // Your PDF generation code can be inserted here.
      // await generatePDF(data);

      setButtonloader((prevState) => ({
        ...prevState,
        [data.id]: false,
      }));
    }
  }, []);

  const deletecard = async () => {
    if (singlestamp?.id) {
      try {
        setLoading(true);
        const response = await deleteStamp(singlestamp.id);
        if (response.status === 204) {
          setOpen(false);
          toast.success(t("deletesuccess"));
          dispatch(deletestamp(singlestamp.id));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const copycard = async () => {
    if (singlestamp?.id) {
      try {
        setLoading(true);
        const response = await copyStamp(singlestamp);
        if ([200, 201].includes(response.status)) {
          setOpencopy(false);
          toast.success(t("copysuccess"));
          // Adding a new stamp via Redux.
          dispatch(AddNewstamp(response?.data?.data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const activecard = async () => {
    if (singlestamp?.id) {
      try {
        setLoading(true);
        const response = await activeStamp(singlestamp);
        if ([200, 201].includes(response.status)) {
          setOpenactive(false);
          toast.success(t("activatesuccess"));
          dispatch(updatestamps(response?.data?.data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // ------------------ Render ------------------ //
  return (
    <div className="relative">
      {/* Classic Loader overlay; shows until all fetching/API operations are done */}
      {loading && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-white opacity-80">
          <Loader loading={true} />
        </div>
      )}
      <div
        ref={containerRef}
        className="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] gap-x-[3rem] gap-y-[8rem] pt-4"
      >
        {/* The Create New Pass card is always rendered first */}
        <CreateComponent t={t} />
        {components?.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={`${draggedItemIndex === index ? "dragging" : ""}`}
          >
            <PassComponent
            t={t}
              data={item}
              buttonloader={buttonloader[item.id] || false}
              setOpen={setOpen}
              generate={generate}
              setSingleStamp={setSingleStamp}
              setOpencopy={setOpencopy}
              setOpenactive={setOpenactive}
            />
          </div>
        ))}
      </div>

      {/* Modals for delete, copy, and activate */}
      <DeleteCardModal
        t={t}
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={deletecard}
        singlestamp={singlestamp}
      />
      <CopycardModal
        open={opencopy}
        t={t}
        handleClose={() => setOpencopy(false)}
        handleCopy={copycard}
        singlestamp={singlestamp}
      />
      <ActivecardModal
        t={t}
        open={openactive}
        handleClose={() => setOpenactive(false)}
        handleActive={activecard}
        singlestamp={singlestamp}
      />
    </div>
  );
}

// ------------------ Memoized Pass (Card) Component ------------------ //

const PassComponent = memo(function PassComponent({
  buttonloader,
  data,
  setOpen,
  generate,
  setSingleStamp,
  setOpencopy,
  setOpenactive,
  t
}) {
  // Use your route map
  const [routeMap] = useState(routeMa);
  const designformData = data;
  const informationformData = data;

  return (
    <div className="component-container w-full flex flex-col items-center rounded-lg">
      <div className="w-full max-w-[17rem]">
        <Link to={`/pass/pass-settings/${data.id}`}>
          <PhoneEmulator
            status={designformData.card_status}
            emulatorContent={
              <DefaultCardContent
                routeMap={routeMap}
                cardType={data?.cardType}
                informationformData={informationformData}
                designformData={designformData}
                stampName={data?.stampName}
              />
            }
            onlyPhone={true}
          />
        </Link>
      </div>
      <span className="font-bold text-xl mt-2">{data?.stampName}</span>
      <Link className="w-full flex justify-center" to={`/pass/pass-settings/${data.id}`}>
        <button className="bg-black text-white py-3 my-3 rounded w-[80%] max-w-[240px]">
          {t("open")}
        </button>
      </Link>
      <div className="flex gap-4 pb-4 items-center">
        <div className="w-full h-full">
          <img
            src="/assets/question.png"
            alt="question"
            className="w-full px-[.23rem] py-[.20rem] rounded-2xl cursor-pointer h-full bg-[#387DFF]"
          />
        </div>
        <div className={`rounded bg-gray-200 p-3 ${data.card_status ? "disabled" : "cursor-pointer"}`}>
          <Tippy content={data.card_status === false ? t("Activate") : t("CardActivated")}>
            <button>
              <CiPower
                className={`text-xl ${data.card_status ? "disabled" : "cursor-pointer"}`}
                title={data.card_status === false ? t("Activate") : t("CardActivated")}
                onClick={() => {
                  if (!data.card_status) {
                    setOpenactive(true);
                    setSingleStamp(data);
                  }
                }}
              />
            </button>
          </Tippy>
        </div>
        <div className="rounded bg-gray-200 p-3">
          <Tippy content={t("pdfdownload")}>
            <PDFGeneratorWithLoader data={data}>
              <button>
                {buttonloader ? (
                  <StylishLoader size="sm" color="black" />
                ) : (
                  <GrDocumentDownload title={t("pdfdownload")}className="text-xl cursor-pointer" />
                )}
              </button>
            </PDFGeneratorWithLoader>
          </Tippy>
        </div>
        <div className="rounded bg-gray-200 p-3">
          <Tippy content={t("copycard")}>
            <button>
              <BiCopyAlt
                className="text-xl cursor-pointer"
                onClick={() => {
                  setOpencopy(true);
                  setSingleStamp(data);
                }}
              />
            </button>
          </Tippy>
        </div>
        <div className="rounded bg-gray-200 p-3">
          <Tippy content={t("delete")}>
            <button>
              <AiTwotoneDelete
                className="text-xl cursor-pointer"
                onClick={() => {
                  setOpen(true);
                  setSingleStamp(data);
                }}
              />
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  );
});

// ------------------ Create New Pass Component ------------------ //

function CreateComponent({t}) {
  return (
    <div className="flex flex-col items-center rounded-lg">
      <PhoneEmulator status={true} MbBanner={false} onlyPhone={true} />
      <span className="font-bold text-xl mt-2">{t("createcard")}</span>
      <Link className="w-full flex justify-center" to={"/cards/create"}>
        <button className="py-3 my-3 rounded w-[80%] border bg-white">
          {t("fromscratch")}
        </button>
      </Link>
    </div>
  );
}
