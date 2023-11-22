export interface Church {
  _id?: number;
  church_name: string;
  phone_number: string;
  location: string;
  createdAt: string;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  createdAt: string;
  church_id: string;
}

export interface AddUser {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  church_id: string;
}

export interface AddChurch {
  church_name: string;
  location: string;
  email: string;
  phone_number: string;
  brand_colour_1: string;
  brand_colour_2: string;
}

export interface AddMember {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  decision: string;
  invitee: string;
}

export interface Member {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  decision: string;
  invitee: string;
  church_id: string;
  createdAt: string;
}

export interface AddAdmin {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  church_id: string;
}

export interface UpdateMember {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  invitee: string;
  id: string;
}

export interface Admin {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  church_id: string;
}

export interface Summaries {
  number_of_members: string;
  number_of_stable_members: string;
  number_of_stable_visitors: string;
}
