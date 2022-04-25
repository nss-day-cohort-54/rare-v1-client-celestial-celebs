import { useState } from "react";

export const useModal = (selector) => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const toggleDialogue = () => {
    setModalOpen(!modalIsOpen);
    if (modalIsOpen) {
      document.getElementById(`${selector}`).removeAttribute("open");
    } else {
      console.log(document.getElementById(`${selector}`));
      document.getElementById(`${selector}`).setAttribute("open", true);
    }
  };
  return { toggleDialogue, modalIsOpen };
};
