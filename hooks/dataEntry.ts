"use client";
import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { AddAdmin, Member, User } from "@/utils/interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";

const dataEntry = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const router = useRouter();
  const addAdmin = async ({
    first_name,
    last_name,
    email,
    phone_number,
    church_id,
  }: AddAdmin) => {
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

      //console.log(response);
      router.push("/admins");
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

  const getMembers = async () => {
    try {
      const response = await axios.get(`/api/members`);

      const membersData = response.data.members as Member[];

      return membersData;
    } catch (error) {
      console.log(error);

      return [];
    }
  };
  const searchMember = async ({ query_param }: { query_param: string }) => {
    try {
      const response = await axios.post("/api/search_members", {
        query_param,
      });
      const membersData = response.data.members as Member[];

      return membersData;
    } catch (error) {}
  };

  const getAdmins = async () => {
    try {
      const response = await axios.get("/api/admins");

      const responseData = response.data as User[];
      //console.log(responseData);

      return responseData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const changePassword = async ({
    current_password,
    new_password,
  }: {
    current_password: string;
    new_password: string;
  }) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });
    try {
      const response = await axios.post("/api/change_password", {
        current_password,
        new_password,
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
      return error;
    }
  };

  const currentDate = (date: string) => {
    const inputDate = new Date(date);

    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const year = String(inputDate.getFullYear());

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };
  const getMember = async (id: string) => {
    try {
      const response = await axios.get("/api/members/" + id);

      const responseData = response.data.member as Member;

      return responseData;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateMember = async ({
    first_name,
    last_name,
    phone_number,
    address,
    invitee,
    id,
  }: any) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });
    try {
      const response = await axios.put("/api/members", {
        first_name,
        last_name,
        phone_number,
        address,
        invitee,
        id,
      });
      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: true,
      });
      // router.push("/members");

      return response;
    } catch (error) {
      console.log(error);
      setAuthState({
        success: false,
        loading: false,
        error: true,
        showSnackbar: false,
      });
      return null;
    }
  };

  const updateUser = async ({
    id,
    first_name,
    last_name,
    email,
    phone_number,
  }: any) => {
    try {
      setAuthState({
        success: false,
        loading: true,
        error: false,
        showSnackbar: false,
      });
      const response = await axios.put("/api/users", {
        first_name,
        last_name,
        phone_number,
        email,
        id,
      });
      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: true,
      });
      return response;
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
    updateUser,
    updateMember,
    getMember,
    addAdmin,
    getMembers,
    searchMember,
    changePassword,
    getAdmins,
    currentDate,
  };
};

export default dataEntry;
