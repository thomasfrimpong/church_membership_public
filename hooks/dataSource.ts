"use client";
import { useContext } from "react";
import {
  Church,
  AddUser,
  User,
  AddChurch,
  AddMember,
  Summaries,
} from "@/utils/interfaces";
import axios from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const dataSource = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const router = useRouter();
  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users");

      const responseData = response.data as User[];
      //console.log(responseData);

      return responseData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getChurches = async () => {
    try {
      const response = await axios.get("/api/churches");

      const churchData = response.data.churches as Church[];
      return churchData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const addUser = async ({
    first_name,
    last_name,
    email,
    phone_number,
    church_id,
  }: AddUser) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });
    try {
      const response = await axios.post("/api/users", {
        first_name,
        last_name,
        email,
        phone_number,
        church_id,
      });
      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: true,
      });

      console.log(response);
      router.push("/users");
      return response;
    } catch (error) {
      setAuthState({
        success: false,
        loading: false,
        error: true,
        showSnackbar: false,
      });
      console.log(error);
    }
  };

  const addChurch = async ({
    church_name,
    location,
    email,
    phone_number,
    brand_colour_1,
    brand_colour_2,
  }: AddChurch) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });
    try {
      const response = await axios.post("/api/churches", {
        church_name,
        location,
        email,
        phone_number,
        brand_colour_1,
        brand_colour_2,
      });

      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: true,
      });

      router.push("/churches");
      return response.data;
    } catch (error) {
      setAuthState({
        success: false,
        loading: false,
        error: true,
        showSnackbar: false,
      });
    }
  };

  const getSummaries = async () => {
    try {
      const response = await axios.get("/api/summaries");

      const responseData = response.data as Summaries;
      console.log(responseData);
      return responseData;
    } catch (error) {
      return [];
    }
  };
  const fonts = () => {
    return [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(",");
  };

  const addMember = async ({
    first_name,
    last_name,
    phone_number,
    address,
    decision,
    invitee,
  }: AddMember) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });
    try {
      const response = await axios.post("/api/members", {
        first_name,
        last_name,
        phone_number,
        address,
        decision,
        invitee,
      });
      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: true,
      });
      return response.status;
    } catch (error) {
      setAuthState({
        success: false,
        loading: false,
        error: true,
        showSnackbar: false,
      });
    }
  };

  return {
    getUsers,
    addChurch,
    getChurches,
    addUser,
    addMember,
    getSummaries,
    fonts,
  };
};
export default dataSource;
