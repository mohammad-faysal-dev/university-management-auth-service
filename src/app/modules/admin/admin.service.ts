import type { IAdmin } from './admin.interface.js'
import { Admin } from './admin.model.js'

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id)
  return result
}

const updateAdmin = async (
  id: string | undefined,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const result = await Admin.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteAdmin = async (id: string | undefined): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id)
  return result
}
export const AdminService = {
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
