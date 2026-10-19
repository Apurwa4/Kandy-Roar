"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  ScrollText,
  Send,
  AlertCircle,
  User,
  Mail,
  GraduationCap,
  Briefcase,
  ShieldAlert,
  ShieldCheck,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";

export default function RoyalRegistrationForm() {
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const steps = ["About you", "Contact", "Your university", "Your role", "Emergency contact"];
  const goToStep = (next: number) => {
    setErrorMsg(null);
    setStep(next);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      formRef.current?.querySelector<HTMLElement>("fieldset:not([disabled]) [data-step-heading]")?.focus({ preventScroll: true });
    });
  };
  const validateStep = () => {
    const controls = formRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("fieldset:not([disabled]) input, fieldset:not([disabled]) select, fieldset:not([disabled]) textarea");
    for (const control of controls ?? []) {
      control.setCustomValidity(control.required && !control.value.trim() ? "Please fill in this field." : "");
      if (!control.reportValidity()) return false;
    }
    return true;
  };
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    entity: "",
    entityOther: "",
    faculty: "",
    facultyOther: "",
    frontOffice: "",
    backOffice: "",
    position: "",
    nic: "",
    uniRegNo: "",
    address: "",
    emergencyName: "",
    emergencyPhone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    registrationId: string;
    fullName: string;
    entity: string;
    email: string;
    googleSheetStatus?: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const entityOptions = [
    "AIESEC in Kandy",
    "AIESEC in Jaffna",
    "AIESEC in Vavuniya",
    "Other",
  ];

  const facultyOptions = [
    "Engineering",
    "Science",
    "Arts",
    "Medicine",
    "Management",
    "Agriculture",
    "Veterinary Sciences",
    "Allied Health Sciences",
    "Dental Sciences",
    "Other",
  ];

  const frontOfficeOptions = [
    "iGV",
    "oGV",
    "iGTa/e",
    "oGTa/e",
    "None / External",
  ];

  const backOfficeOptions = [
    "Marketing",
    "FnL & IM",
    "PR",
    "BD",
    "TM",
    "EM",
    "None / External",
  ];

  const positionOptions = [
    "LCP",
    "LCVP",
    "Manager",
    "Specialist",
    "Team Leader",
    "Team Member",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    e.target.setCustomValidity("");
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    if (step < steps.length - 1) {
      goToStep(step + 1);
      return;
    }
    setErrorMsg(null);

    if (!formData.fullName.trim()) return setErrorMsg("Please provide your royal name.");
    if (!formData.email.trim()) return setErrorMsg("Please provide your email address.");
    if (!formData.phone.trim()) return setErrorMsg("Please provide your WhatsApp contact number.");
    if (!formData.dob) return setErrorMsg("Please share your date of birth.");
    if (!formData.entity) return setErrorMsg("Please choose which kingdom/entity you represent.");
    if (formData.entity === "Other" && !formData.entityOther.trim())
      return setErrorMsg("Please specify your entity name.");
    if (!formData.faculty) return setErrorMsg("Please select your academic faculty/realm.");
    if (formData.faculty === "Other" && !formData.facultyOther.trim())
      return setErrorMsg("Please specify your faculty name.");
    if (!formData.frontOffice) return setErrorMsg("Please select your Front Office royal duty.");
    if (!formData.backOffice) return setErrorMsg("Please select your Back Office royal department.");
    if (!formData.position) return setErrorMsg("Please select your position in the royal council.");
    if (!formData.nic.trim()) return setErrorMsg("Please enter your NIC number.");
    if (!formData.address.trim()) return setErrorMsg("Please share your permanent home village address.");
    if (!formData.emergencyName.trim()) return setErrorMsg("Please name an emergency contact person.");
    if (!formData.emergencyPhone.trim()) return setErrorMsg("Please provide your emergency contact number.");

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "The royal court could not record your submission.");
      }

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#f1cf6b", "#750f24", "#fae19c", "#ffffff"],
      });

      setSuccessData({
        registrationId: data.registrationId,
        fullName: formData.fullName,
        entity: formData.entity === "Other" ? formData.entityOther : formData.entity,
        email: formData.email,
        googleSheetStatus: data.googleSheetStatus,
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        entity: "",
        entityOther: "",
        faculty: "",
        facultyOther: "",
        frontOffice: "",
        backOffice: "",
        position: "",
        nic: "",
        uniRegNo: "",
        address: "",
        emergencyName: "",
        emergencyPhone: "",
        message: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong in the royal registry.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (successData?.registrationId) {
      navigator.clipboard.writeText(successData.registrationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="registration" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Decorative Title Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3a0610] border border-[#d4af37]/40 text-xs font-bold text-[#fae19c] uppercase tracking-wider">
          <ScrollText className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Official Registration Portal</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#ffffff]">
          Inscribe In The <span className="gold-text">Royal Registry</span>
        </h2>
        <p className="text-sm sm:text-base text-[#f6eedb]/80 max-w-2xl mx-auto">
          Complete this proclamation form to register your interest in joining the grand gathering of Kandy Roar 7.0.
        </p>
      </div>

      {/* Success Modal / Digital Royal Pass */}
      {successData ? (
        <div className="parchment-scroll rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl border-4 border-[#d4af37]">
          {/* Royal Seal Watermark with Lion Emblem */}
          <div className="absolute -top-8 -right-8 w-44 h-44 opacity-10 pointer-events-none">
            <Image
              src="/images/kandy-roar-lion-emblem.png"
              alt="Watermark"
              fill
              className="object-contain"
            />
          </div>

          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#580b1a] to-[#750f24] text-[#fae19c] mx-auto flex items-center justify-center p-3 mb-4 shadow-lg border-2 border-[#d4af37]">
            <Image
              src="/images/kandy-roar-lion-emblem.png"
              alt="Lion Emblem"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          <div className="font-sinhala text-2xl text-[#750f24] font-bold">
            රාජකීය ලියාපදිංචිය තහවුරු විය!
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#210408] mt-1">
            Royal Proclamation Accepted!
          </h3>

          <p className="text-sm text-[#4a2e2b] max-w-lg mx-auto mt-2 leading-relaxed">
            Welcome to the gathering, <strong className="text-[#750f24]">{successData.fullName}</strong>.
            Your royal inscription has been permanently entered into the records of the Kingdom of Kandy.
          </p>

          {/* Royal Certificate Card */}
          <div className="my-6 p-5 sm:p-6 rounded-2xl bg-white/80 border-2 border-[#c9b382] shadow-inner max-w-md mx-auto text-left relative">
            <div className="flex justify-between items-start border-b border-[#c9b382]/50 pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9">
                  <Image
                    src="/images/kandy-roar-lion-emblem.png"
                    alt="Emblem"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-[#8a650c]">Delegate Pass</div>
                  <div className="font-heading font-black text-lg text-[#210408]">KANDY ROAR 7.0</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-[#8a650c]">Registry Code</div>
                <div className="font-mono font-bold text-sm text-[#750f24]">{successData.registrationId}</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#2b1810]">
              <div><strong>Villager Name:</strong> {successData.fullName}</div>
              <div><strong>Kingdom / Entity:</strong> {successData.entity}</div>
              <div><strong>Royal Messenger:</strong> {successData.email}</div>
              <div><strong>Gathering Dates:</strong> 9th–10th January</div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#c9b382]/50 flex items-center justify-between">
              <span className="text-[10px] font-sinhala text-[#750f24] font-bold">රාජකාරිය අනුමතයි • 10 Years LDS</span>
              <button
                onClick={handleCopyId}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-[#23040a] text-[#fae19c] hover:bg-[#3a0610] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Code"}</span>
              </button>
            </div>
          </div>

          <div className="text-xs text-[#5a423f] max-w-md mx-auto mb-6 bg-[#eedfc5]/60 p-2.5 rounded-xl border border-[#c9b382]">
            <span>Please take a screenshot of your Royal Registry Code for accreditation at the gates.</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => { setStep(0); setSuccessData(null); }}
              className="gold-btn px-6 py-2.5 rounded-full text-xs uppercase font-extrabold flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Register Another Villager</span>
            </button>
          </div>
        </div>
      ) : (
        /* The Ancient Inscription Scroll Form */
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="registration-wizard parchment-scroll rounded-3xl p-6 sm:p-10 lg:p-12 relative shadow-2xl space-y-8 scroll-mt-24"
        >
          {/* Scroll Header */}
          <div className="border-b-2 border-[#c9b382] pb-6 text-center">
            <div className="flex items-center justify-center gap-3 text-lg font-bold text-[#750f24]">
              <div className="w-8 h-px bg-[#c9b382]" />
              <span className="font-sinhala">රාජකීය ආරාධනය</span>
              <div className="w-8 h-px bg-[#c9b382]" />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-[#210408] mt-1">
              Registry of the Kingdom&apos;s Villagers
            </h3>
            <p className="text-xs sm:text-sm text-[#5a403a] max-w-xl mx-auto mt-1">
              Fields marked with an asterisk (<span className="text-[#a51934] font-bold">*</span>) are essential
              royal requirements.
            </p>
          </div>

          <div>
            <div className="mb-3 flex justify-between gap-3 text-sm font-semibold text-[#750f24]" aria-live="polite">
              <span>Step {step + 1} of {steps.length} · {steps[step]}</span>
              <span>{Math.round((step / steps.length) * 100)}% complete</span>
            </div>
            <div role="progressbar" aria-label="Registration progress" aria-valuemin={0} aria-valuemax={5} aria-valuenow={step} className="h-2 overflow-hidden rounded-full bg-[#c9b382]/30">
              <div className="h-full rounded-full bg-[#750f24] transition-[width] duration-300" style={{ width: `${step / steps.length * 100}%` }} />
            </div>
            <ol className="mt-4 hidden justify-between gap-3 sm:flex">
              {steps.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined} className={`text-xs ${index === step ? "font-bold text-[#750f24]" : "text-[#6b4e45]"}`}>{index < step ? "✓ " : ""}{label}</li>)}
            </ol>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-[#ffd9df] border-2 border-[#a51934] text-[#750f24] text-xs sm:text-sm flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-[#a51934]" />
              <div className="font-semibold">{errorMsg}</div>
            </div>
          )}

          {/* SECTION 1: IDENTITY OF THE VILLAGER */}
          <fieldset hidden={step !== 0} disabled={step !== 0 || isSubmitting} className="space-y-6">
            <div className="flex items-center gap-2 text-[#750f24] font-heading font-bold text-sm sm:text-base border-b border-[#c9b382]/60 pb-1.5">
              <User className="w-4 h-4 text-[#750f24]" />
              <span data-step-heading tabIndex={-1}>Let’s start with you</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2 space-y-1">
                <label htmlFor="registry-fullName" className="block text-xs font-bold text-[#2b1810]">
                  Full name <span className="text-[#a51934]">*</span>
                </label>
                <p className="text-[11px] text-[#6b4e45]">Use your full name as it appears on your NIC.</p>
                <input
                  id="registry-fullName" type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Bandara Senanayake"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                />
              </div>

              {/* NIC Number */}
              <div className="space-y-1">
                <label htmlFor="registry-nic" className="block text-xs font-bold text-[#2b1810]">
                  NIC number <span className="text-[#a51934]">*</span>
                </label>
                <p className="text-[11px] text-[#6b4e45]">Your national identity card number.</p>
                <input
                  id="registry-nic" type="text"
                  name="nic"
                  required
                  value={formData.nic}
                  onChange={handleChange}
                  placeholder="e.g. 200212345678 or 991234567V"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-1">
                <label htmlFor="registry-dob" className="block text-xs font-bold text-[#2b1810]">
                  Date of birth <span className="text-[#a51934]">*</span>
                </label>
                
                <input
                  id="registry-dob" type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                />
              </div>

              {/* Permanent Home Address */}
              <div className="sm:col-span-2 space-y-1">
                <label htmlFor="registry-address" className="block text-xs font-bold text-[#2b1810]">
                  Permanent home address <span className="text-[#a51934]">*</span>
                </label>
                
                <textarea
                  id="registry-address" rows={2}
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. No. 45, Temple Road, Kandy"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all resize-none"
                />
              </div>
            </div>
          </fieldset>

          {/* SECTION 2: ROYAL MESSENGERS (COMMUNICATIONS) */}
          <fieldset hidden={step !== 1} disabled={step !== 1 || isSubmitting} className="space-y-6">
            <div className="flex items-center gap-2 text-[#750f24] font-heading font-bold text-sm sm:text-base border-b border-[#c9b382]/60 pb-1.5">
              <Mail className="w-4 h-4 text-[#750f24]" />
              <span data-step-heading tabIndex={-1}>How can we reach you?</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="registry-email" className="block text-xs font-bold text-[#2b1810]">
                  Email address <span className="text-[#a51934]">*</span>
                </label>
                <p className="text-[11px] text-[#6b4e45]">Event updates will be sent here.</p>
                <input
                  id="registry-email" type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. apurwa.fernando@aiesec.net"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                />
              </div>

              {/* WhatsApp Contact */}
              <div className="space-y-1">
                <label htmlFor="registry-phone" className="block text-xs font-bold text-[#2b1810]">
                  Contact number (WhatsApp preferred) <span className="text-[#a51934]">*</span>
                </label>
                <p className="text-[11px] text-[#6b4e45]">Include your country code if outside Sri Lanka.</p>
                <input
                  id="registry-phone" type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 077 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                />
              </div>
            </div>
          </fieldset>

          {/* SECTION 3: ACADEMIC REALM & ENTITY */}
          <fieldset hidden={step !== 2} disabled={step !== 2 || isSubmitting} className="space-y-6">
            <div className="flex items-center gap-2 text-[#750f24] font-heading font-bold text-sm sm:text-base border-b border-[#c9b382]/60 pb-1.5">
              <GraduationCap className="w-4 h-4 text-[#750f24]" />
              <span data-step-heading tabIndex={-1}>Your university & entity</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* AIESEC Entity */}
              <div className="space-y-1">
                <label htmlFor="registry-entity" className="block text-xs font-bold text-[#2b1810]">
                  AIESEC entity <span className="text-[#a51934]">*</span>
                </label>
                
                <select
                  id="registry-entity" name="entity"
                  required
                  value={formData.entity}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                >
                  <option value="">-- Choose your Entity --</option>
                  {entityOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {formData.entity === "Other" && (
                  <input
                    type="text"
                    name="entityOther"
                    required
                    aria-label="Other AIESEC entity"
                    placeholder="Specify other AIESEC entity..."
                    value={formData.entityOther}
                    onChange={handleChange}
                    className="w-full mt-2 px-3.5 py-2 rounded-xl bg-white border border-[#c9b382] text-xs text-[#210408] outline-none"
                  />
                )}
              </div>

              {/* Faculty */}
              <div className="space-y-1">
                <label htmlFor="registry-faculty" className="block text-xs font-bold text-[#2b1810]">
                  Faculty <span className="text-[#a51934]">*</span>
                </label>
                
                <select
                  id="registry-faculty" name="faculty"
                  required
                  value={formData.faculty}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                >
                  <option value="">-- Choose your Faculty --</option>
                  {facultyOptions.map((fac) => (
                    <option key={fac} value={fac}>
                      {fac}
                    </option>
                  ))}
                </select>
                {formData.faculty === "Other" && (
                  <input
                    type="text"
                    name="facultyOther"
                    required
                    aria-label="Other faculty or institute"
                    placeholder="Specify other faculty / institute..."
                    value={formData.facultyOther}
                    onChange={handleChange}
                    className="w-full mt-2 px-3.5 py-2 rounded-xl bg-white border border-[#c9b382] text-xs text-[#210408] outline-none"
                  />
                )}
              </div>

              {/* University Reg Number */}
              <div className="sm:col-span-2 space-y-1">
                <label htmlFor="registry-uniRegNo" className="block text-xs font-bold text-[#2b1810]">
                  University registration number (optional)
                </label>
                
                <input
                  id="registry-uniRegNo" type="text"
                  name="uniRegNo"
                  value={formData.uniRegNo}
                  onChange={handleChange}
                  placeholder="e.g. S/19/452 or E/20/103 (optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                />
              </div>
            </div>
          </fieldset>

          {/* SECTION 4: ROYAL DUTIES & COUNCIL */}
          <fieldset hidden={step !== 3} disabled={step !== 3 || isSubmitting} className="space-y-6">
            <div className="flex items-center gap-2 text-[#750f24] font-heading font-bold text-sm sm:text-base border-b border-[#c9b382]/60 pb-1.5">
              <Briefcase className="w-4 h-4 text-[#750f24]" />
              <span data-step-heading tabIndex={-1}>Your role in AIESEC</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Front Office */}
              <div className="space-y-1">
                <label htmlFor="registry-frontOffice" className="block text-xs font-bold text-[#2b1810]">
                  Front Office <span className="text-[#a51934]">*</span>
                </label>
                
                <select
                  id="registry-frontOffice" name="frontOffice"
                  required
                  value={formData.frontOffice}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                >
                  <option value="">-- Choose Front Office --</option>
                  {frontOfficeOptions.map((fo) => (
                    <option key={fo} value={fo}>
                      {fo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Back Office */}
              <div className="space-y-1">
                <label htmlFor="registry-backOffice" className="block text-xs font-bold text-[#2b1810]">
                  Back Office <span className="text-[#a51934]">*</span>
                </label>
                
                <select
                  id="registry-backOffice" name="backOffice"
                  required
                  value={formData.backOffice}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                >
                  <option value="">-- Choose Back Office --</option>
                  {backOfficeOptions.map((bo) => (
                    <option key={bo} value={bo}>
                      {bo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Position */}
              <div className="space-y-1">
                <label htmlFor="registry-position" className="block text-xs font-bold text-[#2b1810]">
                  Current position <span className="text-[#a51934]">*</span>
                </label>
                
                <select
                  id="registry-position" name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                >
                  <option value="">-- Choose Position --</option>
                  {positionOptions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          {/* SECTION 5: EMERGENCY CONTACT & MESSAGE */}
          <fieldset hidden={step !== 4} disabled={step !== 4 || isSubmitting} className="space-y-6">
            <div className="flex items-center gap-2 text-[#750f24] font-heading font-bold text-sm sm:text-base border-b border-[#c9b382]/60 pb-1.5">
              <ShieldAlert className="w-4 h-4 text-[#750f24]" />
              <span data-step-heading tabIndex={-1}>One last thing: emergency contact</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Emergency Contact Person */}
              <div className="space-y-1">
                <label htmlFor="registry-emergencyName" className="block text-xs font-bold text-[#2b1810]">
                  Emergency contact name <span className="text-[#a51934]">*</span>
                </label>
                <p className="text-[11px] text-[#6b4e45]">A parent, guardian, sibling, or someone you trust.</p>
                <input
                  id="registry-emergencyName" type="text"
                  name="emergencyName"
                  required
                  value={formData.emergencyName}
                  onChange={handleChange}
                  placeholder="e.g. Parent / Guardian / Sibling Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                />
              </div>

              {/* Emergency Contact Number */}
              <div className="space-y-1">
                <label htmlFor="registry-emergencyPhone" className="block text-xs font-bold text-[#2b1810]">
                  Emergency contact phone <span className="text-[#a51934]">*</span>
                </label>
                
                <input
                  id="registry-emergencyPhone" type="tel"
                  name="emergencyPhone"
                  required
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="e.g. 071 987 6543"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all"
                />
              </div>

              {/* Message to Court */}
              <div className="sm:col-span-2 space-y-1">
                <label htmlFor="registry-message" className="block text-xs font-bold text-[#2b1810]">
                  Anything else we should know? (optional)
                </label>
                <p className="text-[11px] text-[#6b4e45]">
                  Is there anything else you&apos;d like the royal court to know before your arrival? (Dietary needs, expectations, or thoughts)
                </p>
                <textarea
                  id="registry-message" rows={2}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="e.g. Excited for the 10th year celebration! Vegetarian dietary preference."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#c9b382] focus:border-[#750f24] focus:ring-2 focus:ring-[#750f24]/20 text-sm text-[#210408] outline-none transition-all resize-none"
                />
              </div>
            </div>
          </fieldset>

          {/* Submit Button & Assurance */}
          <div className="pt-4 border-t-2 border-[#c9b382] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#5a403a] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#750f24]" />
              <span>Your details are kept within AIESEC in Kandy.</span>
            </div>

            <div className="flex w-full items-center gap-3 sm:w-auto">
            {step > 0 && <button type="button" disabled={isSubmitting} onClick={() => goToStep(step - 1)} className="rounded-full border border-[#750f24]/30 px-6 py-3 text-sm font-bold text-[#750f24] hover:bg-[#750f24]/5 disabled:opacity-50">Back</button>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto gold-btn px-9 py-3.5 rounded-full text-sm uppercase tracking-wider font-extrabold flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#210408]" />
                  <span>Recording Inscription...</span>
                </>
              ) : (
                <>
                  <span>{step === steps.length - 1 ? "Submit registration" : "Continue →"}</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
