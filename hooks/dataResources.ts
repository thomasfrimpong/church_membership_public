"use client";
const dataResources = () => {
  let timer: any;
  const debounce = (func: any, timeout = 300) => {
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };
  return {
    debounce,
  };
};
export default dataResources;
