import { useCallback, useEffect, useState } from "react"
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";

const Payslips = () => {

  const [paySlips, setPaySlips] = useState([])
  const [employees, setEmployee] = useState([])
  const [loading, setLoading] = useState(true);
  const isAdmin = true;

  const fetchPaySlip = useCallback(async () => {
    setPaySlips(dummyPayslipData)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    fetchPaySlip()
  }, [fetchPaySlip]) 

  useEffect(() => {
    if (isAdmin) setEmployee(dummyEmployeeData)
  }, [isAdmin])

  if (loading) return <Loading />

  return (

    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <div>
          <h1 className="page-title">PaySlips</h1>
          <p className="page-subtitle"> {isAdmin ? "Generate and manage employee payslips" : "Your payslips history"} </p>

        </div>

        {isAdmin && <GeneratePayslipForm employees={employees} onSuccess={fetchPaySlip}/>}

      </div>
      <PayslipList  paySlips={paySlips} isAdmin ={isAdmin} />

    </div>
  )
}

export default Payslips
