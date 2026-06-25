import { useCallback, useEffect, useState } from "react"
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const Payslips = () => {

  const [paySlips, setPaySlips] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true);

  const { user } = useAuth()
  const isAdmin = user?.role === "ADMIN";

  const fetchPaySlip = useCallback(async () => {


    try {
      const res = await api.get("/payslips")
      setPaySlips(res.data.data || [])

    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    } finally {
      setLoading(false)
    }

  }, [])

  useEffect(() => {
    fetchPaySlip()
  }, [fetchPaySlip])

  useEffect(() => {

    if (isAdmin) api.get("/employees").then((res) => setEmployees(res.data.filter((e) => !e.isDeleted))).catch(() => {})

  }, [isAdmin])

  if (loading) return <Loading />

  return (

    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <div>
          <h1 className="page-title">PaySlips</h1>
          <p className="page-subtitle"> {isAdmin ? "Generate and manage employee payslips" : "Your payslips history"} </p>

        </div>

        {isAdmin && <GeneratePayslipForm employees={employees} onSuccess={fetchPaySlip} />}

      </div>
      <PayslipList paySlips={paySlips} isAdmin={isAdmin} />

    </div>
  )
}

export default Payslips
