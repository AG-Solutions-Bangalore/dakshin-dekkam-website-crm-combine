import { useState, useRef } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Home, 
  MessageCircle,
  Users,
  Loader
} from 'lucide-react';
import { useApiMutation } from '@/hooks/useApiMutation';
import { useFetchBranch } from '@/hooks/useApi';

import InputField from '@/website/components/common/InputField';
import SelectField from '@/website/components/common/SelectField';
import CaptchaField, { useCaptcha } from '@/website/components/common/CaptchaField';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { CREATE_BOOKING_ROOM } from '@/api';

const BookingRoomForm = () => {
  const [formData, setFormData] = useState({
    branch_id: '',
    guest_name: '',
    guest_email: '',
    guest_full_name: '',
    guest_native: '',
    guest_present_address: '',
    guest_mobile_number: '',
    guest_city: '',
    guest_no_people: '',
    guest_purpose_visit: '',
    guest_checkIn_date: '',
    guest_checkIn_time: '',
    guest_checkOut_date: '',
    guest_checkOut_time: '',
    guest_note: ''
  });

  const { trigger: submitTrigger, loading: submitLoading } = useApiMutation();
  const { data: branchdata } = useFetchBranch();
  const [errors, setErrors] = useState({});
  const {
    captchaCode,
    captchaInput,
    setCaptchaInput,
    honeypot,
    setHoneypot,
    refreshCaptcha,
    validateCaptcha,
  } = useCaptcha();

  const fieldRefs = {
    branch_id: useRef(null),
    guest_name: useRef(null),
    guest_email: useRef(null),
    guest_full_name: useRef(null),
    guest_native: useRef(null),
    guest_present_address: useRef(null),
    guest_mobile_number: useRef(null),
    guest_city: useRef(null),
    guest_no_people: useRef(null),
    guest_purpose_visit: useRef(null),
    guest_checkIn_date: useRef(null),
    guest_checkIn_time: useRef(null),
    guest_checkOut_date: useRef(null),
    guest_checkOut_time: useRef(null)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'guest_mobile_number') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
        setErrors({ ...errors, [name]: '' });
      }
      return;
    }

    if (name === 'guest_no_people') {
      const numericValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: numericValue });
      setErrors({ ...errors, [name]: '' });
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let newErrors = {};

   
    if (!formData.guest_name?.trim()) newErrors.guest_name = 'Full Name of the Guest is required';
    if (!formData.guest_email?.trim()) {
      newErrors.guest_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.guest_email)) {
      newErrors.guest_email = 'Enter a valid email';
    }
    if (!formData.guest_full_name?.trim()) newErrors.guest_full_name = 'This field is required';
    if (!formData.guest_native?.trim()) newErrors.guest_native = 'Native place is required';
    if (!formData.guest_present_address?.trim()) newErrors.guest_present_address = 'Permanent address is required';
    if (!formData.guest_mobile_number) {
      newErrors.guest_mobile_number = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.guest_mobile_number)) {
      newErrors.guest_mobile_number = 'Enter a valid 10-digit number';
    }
    if (!formData.guest_city?.trim()) newErrors.guest_city = 'City is required';
    if (!formData.guest_no_people) newErrors.guest_no_people = 'Number of guests is required';
    if (!formData.guest_purpose_visit?.trim()) newErrors.guest_purpose_visit = 'Purpose of visit is required';
    if (!formData.guest_checkIn_date) newErrors.guest_checkIn_date = 'Checkin Date is required';
    if (!formData.guest_checkIn_time) newErrors.guest_checkIn_time = 'Checkin Time is required';
    if (!formData.guest_checkOut_date) newErrors.guest_checkOut_date = 'Checkout Date is required';
    if (!formData.guest_checkOut_time) newErrors.guest_checkOut_time = 'Checkout Time is required';

    const captchaResult = validateCaptcha();
    if (!captchaResult.isValid) {
      newErrors.captcha = captchaResult.message;
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const ref = fieldRefs[firstErrorKey];
      if (ref?.current) {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
      return;
    }

    try {
      const response = await submitTrigger({
        url: CREATE_BOOKING_ROOM,
        method: 'post',
        data: formData
      });

      if (response?.code === 201) {
        showSuccessToast(response.message || 'Room booking request submitted successfully!');
        
        setFormData({
          branch_id: '',
          guest_name: '',
          guest_email: '',
          guest_full_name: '',
          guest_native: '',
          guest_present_address: '',
          guest_mobile_number: '',
          guest_city: '',
          guest_no_people: '',
          guest_purpose_visit: '',
          guest_checkIn_date: '',
          guest_checkIn_time: '',
          guest_checkOut_date: '',
          guest_checkOut_time: '',
          guest_note: ''
        });
        refreshCaptcha();
      } else {
        showErrorToast(response.message || 'Something went wrong');
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || 'Failed to submit booking request');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto bg-white  my-2 px-6">
   
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Kutchi Bhavan - KDO Room Booking Form
        </h1>
        
        <div className="text-sm text-gray-600 space-y-1">
          <p>This form is for KDO Community. Please use this form for booking room at Kutchi Bhavan - Bangalore</p>
          {/* <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <strong>Contact:</strong> Mr. Devaru Bhatt, Ph: 080-43705354 / 9606922996
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <strong>Map:</strong> 
              <a 
                href="https://maps.app.goo.gl/TZahDYNpbJP6UxuH7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Location
              </a>
            </span>
          </div> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Branch Selection */}
        {/* <SelectField
          ref={fieldRefs.branch_id}
          label="Branch"
          name="branch_id"
          value={formData.branch_id}
          onChange={handleChange}
          options={
            branchdata?.data?.map((branch) => ({
              value: String(branch.id),
              label: branch.branch_name
            })) || []
          }
          error={errors.branch_id}
          
          startIcon={<MapPin size={18} />}
        /> */}

     
 
            <InputField
          ref={fieldRefs.guest_name}
          label="Full Name of the Guest"
          name="guest_name"
          value={formData.guest_name}
          onChange={handleChange}
          placeholder="Enter full name of the guest"
          startIcon={<User size={18} />}
          error={errors.guest_name}
          required
        />
       
        <InputField
          ref={fieldRefs.guest_email}
          label="Email"
          type="email"
          name="guest_email"
          value={formData.guest_email}
          onChange={handleChange}
          placeholder="Enter email"
          startIcon={<Mail size={18} />}
          error={errors.guest_email}
          required
        />
         <InputField
          ref={fieldRefs.guest_mobile_number}
          label="Mobile number"
          type="text"
          name="guest_mobile_number"
          value={formData.guest_mobile_number}
          onChange={handleChange}
          placeholder="Enter 10-digit number"
          startIcon={<Phone size={18} />}
          error={errors.guest_mobile_number}
          required
        />
       <div className=' col-span-1 md:col-span-2 lg:col-span-3'>
        <InputField
          ref={fieldRefs.guest_full_name}
          label="Full Name of the person booking on behalf of the guest. Mention 'SAME' if the Guest is self booking."
          name="guest_full_name"
          value={formData.guest_full_name}
          onChange={handleChange}
          placeholder="Enter full name or 'SAME'"
          startIcon={<User size={18} />}
          error={errors.guest_full_name}
          required
        />

        </div>

       
        <div className=' col-span-1 md:col-span-2  '>
        {/* Location Information */}
        <InputField
          ref={fieldRefs.guest_native}
          label="Native in Kutch"
          name="guest_native"
          value={formData.guest_native}
          onChange={handleChange}
          placeholder="Enter native place in Kutch"
          startIcon={<MapPin size={18} />}
          error={errors.guest_native}
          required
        />

       
</div>
<InputField
          ref={fieldRefs.guest_city}
          label="City you are coming from"
          name="guest_city"
          value={formData.guest_city}
          onChange={handleChange}
          placeholder="Enter city"
          startIcon={<MapPin size={18} />}
          error={errors.guest_city}
          required
        />
        <InputField
          ref={fieldRefs.guest_no_people}
          label="Total number of Guests"
          type="text"
          name="guest_no_people"
          value={formData.guest_no_people}
          onChange={handleChange}
          placeholder="Enter number of guests"
          startIcon={<Users size={18} />}
          error={errors.guest_no_people}
          required
        />

        {/* Check-in Information */}
        <InputField
          ref={fieldRefs.guest_checkIn_date}
          label="Checkin Date"
          type="date"
          name="guest_checkIn_date"
          value={formData.guest_checkIn_date}
          onChange={handleChange}
          startIcon={<Calendar size={18} />}
          error={errors.guest_checkIn_date}
          required
        />

        <InputField
          ref={fieldRefs.guest_checkIn_time}
          label="Checkin Time"
          type="time"
          name="guest_checkIn_time"
          value={formData.guest_checkIn_time}
          onChange={handleChange}
          startIcon={<Clock size={18} />}
          error={errors.guest_checkIn_time}
          required
        />

        {/* Check-out Information */}
        <InputField
          ref={fieldRefs.guest_checkOut_date}
          label="Checkout Date"
          type="date"
          name="guest_checkOut_date"
          value={formData.guest_checkOut_date}
          onChange={handleChange}
          startIcon={<Calendar size={18} />}
          error={errors.guest_checkOut_date}
          required
        />

        <InputField
          ref={fieldRefs.guest_checkOut_time}
          label="Checkout Time"
          type="time"
          name="guest_checkOut_time"
          value={formData.guest_checkOut_time}
          onChange={handleChange}
          startIcon={<Clock size={18} />}
          error={errors.guest_checkOut_time}
          required
        />

        {/* Purpose and Notes */}
        <InputField
          ref={fieldRefs.guest_purpose_visit}
          label="Purpose of the visit"
          name="guest_purpose_visit"
          value={formData.guest_purpose_visit}
          onChange={handleChange}
          placeholder="Enter purpose of visit"
          startIcon={<MessageCircle size={18} />}
          error={errors.guest_purpose_visit}
          required
        />

        {/* Full width fields */}
        <div className="md:col-span-2 lg:col-span-3">
          <InputField
            ref={fieldRefs.guest_present_address}
            label="Permanent Address of the Guest"
            name="guest_present_address"
            type="textarea"
            value={formData.guest_present_address}
            onChange={handleChange}
            placeholder="Enter permanent address"
            startIcon={<Home size={18} />}
            error={errors.guest_present_address}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <InputField
            label="Comments or any specific request"
            name="guest_note"
            type="textarea"
            value={formData.guest_note}
            onChange={handleChange}
            placeholder="Enter any specific requests or comments"
            startIcon={<MessageCircle size={18} />}
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3 max-w-md mt-2">
          <CaptchaField
            captchaCode={captchaCode}
            captchaInput={captchaInput}
            onChange={(e) => {
              setCaptchaInput(e.target.value);
              if (errors.captcha) setErrors((prev) => ({ ...prev, captcha: '' }));
            }}
            onRefresh={refreshCaptcha}
            honeypot={honeypot}
            onHoneypotChange={(e) => setHoneypot(e.target.value)}
            error={errors.captcha}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitLoading}
        className={`w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 ${
          submitLoading ? 'cursor-not-allowed opacity-70' : ''
        }`}
      >
        {submitLoading && <Loader className="w-5 h-5 animate-spin" />}
        {submitLoading ? 'Submitting...' : 'Book Room'}
      </button>
    </form>
  );
};

export default BookingRoomForm;