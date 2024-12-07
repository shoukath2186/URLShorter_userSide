



export const validateForm = (formData, setErrors) => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
    } else {
        // Additional email checks for more specific invalid cases
        const emailParts = formData.email.split('@');
        if (emailParts.length !== 2) {
            newErrors.email = 'Email must contain a single @ symbol';
        } else if (emailParts[1].includes('..')) {
            newErrors.email = 'Email domain cannot contain consecutive dots';
        } else if (emailParts[1].split('.').some(part => part.length === 0)) {
            newErrors.email = 'Email domain parts must be valid';
        }
    }


    // Password validation
    const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!formData.password) {
        newErrors.password = 'Password is required';
    } else if (!strongPasswordRegex.test(formData.password)) {
        newErrors.password =
            'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};