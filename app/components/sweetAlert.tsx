// components/SweetAlert.js
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlert = ({ status, message, onClose }: {status: number, message: string, onClose: any}) => {
  useEffect(() => {
    Swal.fire({
      html: status === 200 ? `<strong>${message}</strong>` : `<strong>${message}</strong>`,
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
