'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { jobSchema, JobFormData } from '@/lib/validations'
import { useRouter } from 'next/navigation'

export default function PostJobForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema)
  })

  async function onSubmit(data: JobFormData) {
    try {
      const requirements = data.requirements
        .split(',')
        .map(r => r.trim())
        .filter(Boolean)

      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, requirements })
      })

      if (!res.ok) throw new Error('Failed to post job')

      router.push('/jobs')
      router.refresh()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          {...register('title')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Junior Frontend Developer"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company
        </label>
        <input
          {...register('company')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. TechCorp"
        />
        {errors.company && (
          <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          {...register('location')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. London or Remote"
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Type
        </label>
        <select
          {...register('type')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Salary (optional)
        </label>
        <input
          {...register('salary')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. £35,000 - £45,000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the role..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Requirements
        </label>
        <input
          {...register('requirements')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. React, TypeScript, Node.js (comma separated)"
        />
        {errors.requirements && (
          <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Posting...' : 'Post Job'}
      </button>

    </form>
  )
}