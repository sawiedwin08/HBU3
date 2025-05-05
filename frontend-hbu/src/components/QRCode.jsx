import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import PropTypes from "prop-types";
import { API_URL } from "../apiConfig";
import { api } from "../Api";

const QRCodeComponent = ({ activityId }) => {
  const [qrCodeIdentifier, setQrCodeIdentifier] = useState("");

  useEffect(() => {
    // Llamada a la API para obtener el identificador del QR
    const fetchQRCode = async () => {
      try {
        console.log("QR Code..." , activityId);
        const response = await api.get(`${API_URL}dimension/qr_code/${activityId}/qr_code/`);
        if (response.status === 200){
          console.log("Respuesta del servidor:", response.data);
          setQrCodeIdentifier(response.data.qr_code_identifier);
        }
      } catch (error) {
        console.error("Error fetching QR Code:", error);
      }
    };
    const interval = setInterval(fetchQRCode, 3000); // Actualizar cada 15 segundos
    return () => clearInterval(interval);

    // fetchQRCode();
  }, [activityId]);

  return (
    <div>
      {qrCodeIdentifier ? (
        <div className="border-2 border-primary-200 rounded-lg p-4 flex flex-col items-center justify-center">
          {/* <h3>Código QR para la actividad</h3> */}
          <QRCode value={qrCodeIdentifier} size={300} />
        </div>
      ) : (
        <p>Cargando código QR...</p>
      )}
    </div>
  );
};
QRCodeComponent.propTypes = {
  activityId: PropTypes.string.isRequired,
};

export default QRCodeComponent;
