// components/SweetAlert.js
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlert = ({ status, onClose }: {status: number, onClose: any}) => {
  useEffect(() => {
    Swal.fire({
      title: status === 200 ? 'Berhasil!' : 'Gagal!',
      icon: status === 200 ? 'success' : 'error',
      showConfirmButton: true,
    }).then(() => {
      if (onClose) {
        onClose();
      }
    });
  }, [status, onClose]);

  return null;
};

export default SweetAlert;
