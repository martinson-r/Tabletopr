import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SimpleSearch from '../SimpleSearch';
import "./SearchModal.css";

function SearchModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="login" onClick={() => setShowModal(true)}><i className="fas fa-search"></i></div>
      {showModal && (
        <Modal id="search-modal-position" onClose={() => setShowModal(false)}>
          <SimpleSearch />
        </Modal>
      )}
    </>
  );
}

export default SearchModal;
