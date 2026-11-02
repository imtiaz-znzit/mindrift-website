"use client";

import React, { useState } from "react";
import Link from "next/link";
import { contactFormSchema, ContactFormData } from "@/lib/validation";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    fullName: "",
    workEmail: "",
    companyName: "",
    projectType: "",
    estimatedBudget: "",
    projectTimeline: "",
    projectDescription: "",
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(null);
  const [referenceId, setReferenceId] = useState<string>("");
  const [apiErrorMessage, setApiErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiErrorMessage("");

    // Validate client-side with Zod
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (Array.isArray(data.errors)) {
          const serverFieldErrors: Record<string, string> = {};
          data.errors.forEach((issue: { path?: string[]; message?: string }) => {
            if (issue.path && issue.path[0]) {
              serverFieldErrors[issue.path[0]] = issue.message || "Invalid input";
            }
          });
          setErrors(serverFieldErrors);
        }
        throw new Error(data.message || "Failed to process inquiry. Please review your input fields.");
      }

      setSubmissionSuccess(true);
      setReferenceId(data.referenceId || "MDR-" + Math.floor(100000 + Math.random() * 900000));
    } catch (err: unknown) {
      setSubmissionSuccess(false);
      setApiErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 space-y-4 animate-in fade-in duration-200">
        <div className="w-12 h-12 rounded-2xl bg-[#0BCB91]/20 text-[#0BCB91] flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-extrabold text-[#000B49] dark:text-white">
          Inquiry Successfully Received
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Thank you for reaching out to Mindrift Agency. A senior engineering partner will review your technical requirements and respond within one business day under mutual confidentiality.
        </p>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 text-xs font-mono text-slate-700 dark:text-slate-300">
          Inquiry Reference: <span className="font-bold text-[#0BCB91]">{referenceId}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmissionSuccess(null);
            setFormData({
              fullName: "",
              workEmail: "",
              companyName: "",
              projectType: "",
              estimatedBudget: "",
              projectTimeline: "",
              projectDescription: "",
              privacyConsent: false,
            });
          }}
          className="text-xs font-bold text-[#1877F2] dark:text-[#0BCB91] hover:underline pt-2 block"
        >
          Submit another inquiry →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {apiErrorMessage && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
          <span>{apiErrorMessage}</span>
        </div>
      )}

      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-[#000B49] dark:text-slate-200 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={`w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2] ${
              errors.fullName ? "border-red-500" : "border-slate-300 dark:border-slate-700"
            }`}
          />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="workEmail" className="block text-xs font-bold text-[#000B49] dark:text-slate-200 mb-1.5">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="workEmail"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            placeholder="jane@company.com"
            className={`w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2] ${
              errors.workEmail ? "border-red-500" : "border-slate-300 dark:border-slate-700"
            }`}
          />
          {errors.workEmail && <p className="text-xs text-red-500 mt-1">{errors.workEmail}</p>}
        </div>
      </div>

      {/* Row 2: Company Name and Project Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="companyName" className="block text-xs font-bold text-[#000B49] dark:text-slate-200 mb-1.5">
            Company or Organization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Acme Enterprise, Inc."
            className={`w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2] ${
              errors.companyName ? "border-red-500" : "border-slate-300 dark:border-slate-700"
            }`}
          />
          {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
        </div>

        <div>
          <label htmlFor="projectType" className="block text-xs font-bold text-[#000B49] dark:text-slate-200 mb-1.5">
            Primary Practice Area <span className="text-red-500">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2] ${
              errors.projectType ? "border-red-500" : "border-slate-300 dark:border-slate-700"
            }`}
          >
            <option value="">Select a category...</option>
            <option value="Software & Digital Product Engineering">Software & Digital Product Engineering</option>
            <option value="AI, Machine Learning & Data Intelligence">AI, Machine Learning & Data Intelligence</option>
            <option value="Cloud, DevOps & Platform Engineering">Cloud, DevOps & Platform Engineering</option>
            <option value="Cybersecurity & Defensive Engineering">Cybersecurity & Defensive Engineering</option>
            <option value="Enterprise Solutions & System Integration">Enterprise Solutions & System Integration</option>
            <option value="GIS & Location Intelligence">GIS & Location Intelligence</option>
            <option value="Product Strategy & Technical Consulting">Product Strategy & Technical Consulting</option>
            <option value="Database & Data Platform Engineering">Database & Data Platform Engineering</option>
            <option value="Multi-Discipline / Other">Multi-Discipline / Other</option>
          </select>
          {errors.projectType && <p className="text-xs text-red-500 mt-1">{errors.projectType}</p>}
        </div>
      </div>

      {/* Row 3: Estimated Budget & Timeline (Optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="estimatedBudget" className="block text-xs font-bold text-[#000B49] dark:text-slate-200 mb-1.5">
            Estimated Budget <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <select
            id="estimatedBudget"
            name="estimatedBudget"
            value={formData.estimatedBudget || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
          >
            <option value="">Prefer to discuss during discovery</option>
            <option value="<$25,000">&lt; $25,000</option>
            <option value="$25,000 - $50,000">$25,000 – $50,000</option>
            <option value="$50,000 - $100,000">$50,000 – $100,000</option>
            <option value="$100,000+">$100,000+</option>
          </select>
        </div>

        <div>
          <label htmlFor="projectTimeline" className="block text-xs font-bold text-[#000B49] dark:text-slate-200 mb-1.5">
            Target Timeline <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <select
            id="projectTimeline"
            name="projectTimeline"
            value={formData.projectTimeline || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
          >
            <option value="">Select target timeline...</option>
            <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
            <option value="1 - 3 months">1 – 3 months</option>
            <option value="3 - 6 months">3 – 6 months</option>
            <option value="Exploratory / Planning phase">Exploratory / Planning phase</option>
          </select>
        </div>
      </div>

      {/* Row 4: Project Description */}
      <div>
        <label htmlFor="projectDescription" className="block text-xs font-bold text-[#000B49] dark:text-slate-200 mb-1.5">
          Project Scope & Technical Requirements <span className="text-red-500">*</span>
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows={5}
          value={formData.projectDescription}
          onChange={handleChange}
          placeholder="Describe your system requirements, current architecture bottlenecks, desired deliverables, and key constraints..."
          className={`w-full px-4 py-3 text-sm rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2] ${
            errors.projectDescription ? "border-red-500" : "border-slate-300 dark:border-slate-700"
          }`}
        />
        {errors.projectDescription && (
          <p className="text-xs text-red-500 mt-1">{errors.projectDescription}</p>
        )}
      </div>

      {/* Row 5: Privacy Notice Consent */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            name="privacyConsent"
            checked={formData.privacyConsent}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded border-slate-300 text-[#1877F2] focus:ring-[#1877F2]"
          />
          <span className="text-xs text-slate-600 dark:text-slate-400">
            I agree to the handling of this inquiry data in accordance with the{" "}
            <Link href="/privacy-policy" className="text-[#1877F2] dark:text-[#0BCB91] underline" target="_blank">
              Privacy Policy
            </Link>
            . We respect your confidentiality and never share your details with third parties.
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="text-xs text-red-500 mt-1">{errors.privacyConsent}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#000B49] hover:bg-[#1877F2] dark:bg-[#1877F2] dark:hover:bg-blue-600 disabled:opacity-50 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Verifying & Sending...</span>
          </>
        ) : (
          <>
            <span>Submit Technical Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
