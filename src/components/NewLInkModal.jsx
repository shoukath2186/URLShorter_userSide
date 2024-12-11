import React, { useEffect, useState } from "react";
import { validateForm } from "../Validation/UrlValidation";
import { QRCodeSVG } from "qrcode.react";
import { saveURL } from "../configaration/endpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResponsiveModal = ({ isOpen, onClose,url }) => {
  const [formData, setFormData] = useState({
    title: "",
    originalLink: "",
    customLink: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null);
  const [ching,setChange]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{ 
    if(url){
      formData.originalLink=url
    }
  },[url])

  useEffect(()=>{
    if (formData.originalLink.trim()) {
      const svgElement = document.getElementById("qr-code-svg");
      if (svgElement) {
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
        setQrCodeDataUrl(dataUrl);
       // console.log(qrCodeDataUrl);
      }
    } else {
      setQrCodeDataUrl(null);
    }
  },[formData.originalLink ])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); 
  };
  async function saveData() {
    try {
      const data=await saveURL(formData,qrCodeDataUrl);
      console.log(data);
      toast.success(data.message)
       onClose(); 
       reset();
       setChange(!ching)
       navigate(`/dashboard?id=${ching}`);
    } catch (error) {
      
      toast.error(error.response.data.message)
      
    }


  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {

      console.log("Form submitted successfully:", formData);
      saveData()
    }
  };

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      reset()
      onClose();
    }
  };
  function reset(){
    setFormData({
      title: "",
      originalLink: "",
      customLink: "",
    }

    )
  }

  return (
    <div
      id="modal-background"
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the background
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Link Details</h2>
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {formData.originalLink && (
            <div className="flex justify-center">
              <QRCodeSVG
                id="qr-code-svg"
                value={formData.originalLink}
                size={128}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
              />
            </div>
          )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 ${
                formErrors.title && "border-red-500"
              }`}
            />
            {formErrors.title && (
              <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="originalLink"
            >
              Your Link
            </label>
            <input
              type="text"
              id="originalLink"
              name="originalLink"
              placeholder="Your Link"
              value={formData.originalLink}
              onChange={handleChange}
              className={`w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 ${
                formErrors.originalLink && "border-red-500"
              }`}
            />
            {formErrors.originalLink && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.originalLink}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="customLink"
            >
              Custom Link (Optional)
            </label>
            <input
              type="text"
              id="customLink"
              placeholder="Custom Link (optional)"
              name="customLink"
              value={formData.customLink}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResponsiveModal;
