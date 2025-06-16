
import React, { useEffect } from "react";
import { serverUrl } from "../config";
import axios from "axios";

// Generate a code verifier (a high-entropy cryptographic random string)
function generateCodeVerifier() {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

// Generate a code challenge (SHA256 hash of the code verifier, base64-url encoded)
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}


export function User({ setBussinessUser }) {

  useEffect(() => {
    async function authenticateUser() {
      // Check if we have an authorization code in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');

      // //console.log("authorizationCode", authorizationCode)

      if (!authorizationCode) {
        // No code, start OAuth flow
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        localStorage.setItem('pkce_code_verifier', codeVerifier);
        // //console.log(codeChallenge)
        const params = new URLSearchParams({
          response_type: 'code',
          client_id: 'YOUR_CLIENT_ID',
          redirect_uri: 'https://app.highlightcards.co.uk/oauth/callback',
          code_challenge: codeChallenge,
          code_challenge_method: 'S256',
          scope: 'YOUR_REQUESTED_SCOPES',
          state: 'OPTIONAL_STATE_PARAMETER',
        });

        window.location.href = `https://app.gohighlevel.com/oauth/authorize?${params.toString()}`;
      } else {
        // We have an authorization code, exchange it for an access token
        const codeVerifier = localStorage.getItem('pkce_code_verifier');

        const tokenResponse = await fetch('https://app.gohighlevel.com/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: 'https://app.highlightcards.co.uk/oauth/callback',
            client_id: 'YOUR_CLIENT_ID',
            code_verifier: codeVerifier,
          }),
        });

        const tokenData = await tokenResponse.json();

        // Use the access token to fetch user info
        const userInfoResponse = await fetch('https://app.gohighlevel.com/api/userinfo', {
          headers: { 'Authorization': `Bearer ${tokenData.access_token}` },
        });

        const userInfo = await userInfoResponse.json();

        // Set the business user info
        setBussinessUser(userInfo);
      }
    }

    // authenticateUser();
  }, []);


  return (<>
    <div className="text-center font-bold">Hi, I am a Vexion Bussiness User </div>
    <div className="flex justify-center items-center my-4">

      <button onClick={() => {
        setBussinessUser("DUMMY_BUSSINESS_ID")
      }} className="bg-blue-500 p-2 text-white rounded-md ">
        Move to Website
      </button>
    </div>
    <p className="text-center w-full ">👆</p>
    <div className="flex justify-center items-center "> <span className="text-blue-300   text-md font-bold  ">Note:</span> <span className="italic  text-sm text-green-600"> This page is under testing, you can navigate to website by clicking above Button!</span></div>
  </>);
}

