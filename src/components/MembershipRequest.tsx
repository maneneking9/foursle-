import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Heart, CheckCircle, Phone, Mail } from 'lucide-react';
import { api } from '../lib/api';

const { createMembershipRequest } = api;

export default function MembershipRequest() {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    maritalStatus: '',
    nationality: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    homeAddress: '',
    emergencyContact: '',
    salvationDate: '',
    baptismWaterDate: '',
    baptismHolySpiritDate: '',
    ministry: '',
    cell: '',
    spouseName: '',
    numberOfChildren: '',
    householdMember: '',
    familyRole: '',
    membershipStartDate: '',
    attendanceFrequency: '',
    acceptedJesus: '',
    reason: '',
    agreeGuidelines: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeGuidelines) {
      alert('Please agree to the church membership guidelines');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await createMembershipRequest(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '', gender: '', dateOfBirth: '', maritalStatus: '', nationality: '',
          idNumber: '', phoneNumber: '', email: '', homeAddress: '', emergencyContact: '',
          salvationDate: '', baptismWaterDate: '', baptismHolySpiritDate: '', ministry: '',
          cell: '', spouseName: '', numberOfChildren: '', householdMember: '', familyRole: '',
          membershipStartDate: '', attendanceFrequency: '', acceptedJesus: '', reason: '',
          agreeGuidelines: false
        });
      }, 3000);
    } catch (error) {
      alert('Failed to submit request. Please try again.');
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
            <CheckCircle size={80} className="text-green-500 mx-auto" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">Request Submitted!</h2>
          <p className="text-xl text-gray-600">Our team will contact you soon to guide you through the membership process.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 font-semibold mb-6">
            <Users size={20} />
            Join Our Church Family
          </div>
          <h1 className="text-5xl font-black mb-6">Request to be a Church Member</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to take the next step in your faith journey? Fill out the form below to request membership. 
            Our team will reach out to guide you through the process and answer any questions you may have.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <Heart className="text-purple-600 mb-4" size={40} />
            <h3 className="text-2xl font-bold mb-4">About Church Membership</h3>
            <div className="space-y-4 text-gray-600">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">What is it like to be a church member?</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Baptism is a public declaration of faith in Jesus Christ</li>
                  <li>• It symbolizes new life and commitment to following Christ</li>
                  <li>• We celebrate baptisms as a church family!</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Who Can Be a church member?</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Anyone who has made a personal decision to follow Jesus</li>
                  <li>• We welcome all ages, including young children and old people</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl italic text-sm">
                "Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins." - Acts 2:38
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Church Membership Request Form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Gender *</label>
                  <select required value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
                  <input type="date" required value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Marital Status *</label>
                  <select required value={formData.maritalStatus} onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none">
                    <option value="">Select marital status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Nationality *</label>
                  <input type="text" required value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">ID Number (optional)</label>
                  <input type="text" value={formData.idNumber} onChange={(e) => setFormData({...formData, idNumber: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input type="tel" required value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Home Address (optional)</label>
                <input type="text" value={formData.homeAddress} onChange={(e) => setFormData({...formData, homeAddress: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Emergency Contact *</label>
                <input type="text" required value={formData.emergencyContact} onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" placeholder="Name and phone number" />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Salvation Date *</label>
                  <input type="date" required value={formData.salvationDate} onChange={(e) => setFormData({...formData, salvationDate: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Baptism Water Date</label>
                  <input type="date" value={formData.baptismWaterDate} onChange={(e) => setFormData({...formData, baptismWaterDate: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Baptism Holy Spirit Date</label>
                  <input type="date" value={formData.baptismHolySpiritDate} onChange={(e) => setFormData({...formData, baptismHolySpiritDate: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Which ministry do you belong to? (optional)</label>
                  <select value={formData.ministry} onChange={(e) => setFormData({...formData, ministry: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none">
                    <option value="">Select a ministry</option>
                    <option value="Worship">Worship Ministry</option>
                    <option value="Youth">Youth Ministry</option>
                    <option value="Children">Children Ministry</option>
                    <option value="Outreach">Outreach Ministry</option>
                    <option value="Media">Media Ministry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Which cell do you belong to? (optional)</label>
                  <select value={formData.cell} onChange={(e) => setFormData({...formData, cell: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none">
                    <option value="">Select a cell</option>
                    <option value="Cell A">Cell A</option>
                    <option value="Cell B">Cell B</option>
                    <option value="Cell C">Cell C</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Spouse Name (optional)</label>
                  <input type="text" value={formData.spouseName} onChange={(e) => setFormData({...formData, spouseName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Number of children you have</label>
                  <input type="number" value={formData.numberOfChildren} onChange={(e) => setFormData({...formData, numberOfChildren: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Household Member</label>
                  <input type="text" value={formData.householdMember} onChange={(e) => setFormData({...formData, householdMember: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" placeholder="Names of household members" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Your family role (optional)</label>
                  <select value={formData.familyRole} onChange={(e) => setFormData({...formData, familyRole: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none">
                    <option value="">Select a role</option>
                    <option value="Head">Head of Family</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Membership Start Date *</label>
                  <input type="date" required value={formData.membershipStartDate} onChange={(e) => setFormData({...formData, membershipStartDate: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">How often do you attend our services? (optional)</label>
                  <select value={formData.attendanceFrequency} onChange={(e) => setFormData({...formData, attendanceFrequency: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none">
                    <option value="">Select your attendance</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Occasionally">Occasionally</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Have you accepted Jesus Christ? *</label>
                <select required value={formData.acceptedJesus} onChange={(e) => setFormData({...formData, acceptedJesus: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none">
                  <option value="">Select one</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Unsure">Unsure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Why do you want to join our church? *</label>
                <textarea required value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:outline-none" />
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" checked={formData.agreeGuidelines} onChange={(e) => setFormData({...formData, agreeGuidelines: e.target.checked})} className="mt-1" />
                <label className="text-sm text-gray-600">I understand and agree to the church's membership guidelines</label>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit Membership Request'}
              </button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <Phone className="text-purple-600 mb-4" size={40} />
            <h3 className="text-2xl font-bold mb-4">Have Questions? Contact Us</h3>
            <div className="space-y-3 text-gray-600">
              <p><strong>CityLight Branch:</strong> Kigali, Kimironko, Rwanda</p>
              <p><strong>WordLight Branch:</strong> Kigali, Kabuga, Rwanda</p>
              <p><strong>Email:</strong> info@citylightchurch.org</p>
              <p><strong>Phone:</strong> +250 XXX XXX XXX</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-3xl p-8 shadow-lg">
            <CheckCircle className="mb-4" size={40} />
            <h3 className="text-2xl font-bold mb-4">Membership Guidelines</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">What to Expect:</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Our team will contact you to discuss your request and next steps</li>
                  <li>• Membership classes may be required before the ceremony</li>
                  <li>• Family and friends are welcome to attend your baptism</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Our Commitment:</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• We support you in your faith journey</li>
                  <li>• Your information is kept confidential</li>
                  <li>• We celebrate every baptism as a church family</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
