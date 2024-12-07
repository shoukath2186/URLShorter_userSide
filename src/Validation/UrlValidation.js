export const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    } else if (formData.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters long.";
    }
  
    if (!formData.originalLink.trim()) {
      errors.originalLink = "Original Link is required.";
    } else {
      try {
        const url = new URL(formData.originalLink);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          errors.originalLink = "Original Link must be a valid URL.";
        }
      } catch (e) {
        errors.originalLink = "Original Link must be a valid URL.";
      }
    }
    
    if (formData.customLink.trim() && !/^[a-zA-Z0-9-_]+$/.test(formData.customLink.trim())) {
      errors.customLink = "Custom Link can only contain letters, numbers, hyphens, and underscores.";
    }
  
    return errors;
  };