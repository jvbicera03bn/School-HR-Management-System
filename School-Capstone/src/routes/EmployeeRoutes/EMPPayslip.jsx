import { useForm} from "react-hook-form"
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react"

const EMPPayslip = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    function submitHandler(){

    }
    return (
        <div ref={componentRef}  className='Payroll'>
            <div className='form_container'>
                <h2>ASIA TECHNOLOGICAL SCHOOL OF SCIENCE AND ARTS</h2>
                <p>1506. Dila Sta. Rosa. Laguna</p>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className='input_container'>
                        {/* Col 1 */}
                        <div className='form_col'>
                            <div className='input'>
                                <span>Period:</span>
                                <input type='number'
                                    {...register('period',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Employee#:</span>
                                <input type='number'
                                    {...register('employeeNumber',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Name:</span>
                                <input type='text'
                                    {...register('Name',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Designation:</span>
                                <input type='number'
                                    {...register('designation',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Number of Days:</span>
                                <input type='number'
                                    {...register('numOfdays',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Rate Per Day:</span>
                                <input type='number'
                                    {...register('ratePerDay',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Over Time/hr:</span>
                                <input type='number'
                                    {...register('overTimePerHr',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Salary type:</span>
                                <input type='number'
                                    {...register('salaryType',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Number Of Units (Instructor):</span>
                                <input type='number'
                                    {...register('instructorUnits',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Rate/Unit:</span>
                                <input type='number'
                                    {...register('instructorRate',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Number Of Units (Basic Ed):</span>
                                <input type='number'
                                    {...register('basicEdUnits',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Rate/Unit:</span>
                                <input type='number'
                                    {...register('basicEdRate',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                        </div>
                        {/* Col 2 */}
                        <div className='form_col'>
                            <div className='input'>
                                <span>SSS Contribution:</span>
                                <input type='number'
                                    {...register('sssContrib',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Pag-Ibig#:</span>
                                <input type='number'
                                    {...register('pagIbigNum',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>PhilHealth:</span>
                                <input type='text'
                                    {...register('philHealth',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Withholding Tax:</span>
                                <input type='number'
                                    {...register('withHoldingTax',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Lates/Absences:</span>
                                <input type='number'
                                    {...register('lateAbsences',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Cash Advances:</span>
                                <input type='number'
                                    {...register('cashAdvance',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Loans:</span>
                                <input type='number'
                                    {...register('loan',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Pag-ibig Loan:</span>
                                <input type='number'
                                    {...register('pagIbigLoan',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Others:</span>
                                <input type='number'
                                    {...register('others',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input input_total'>
                                <span>Total Deduction:</span>
                                <input type='number' />
                            </div>
                            <div className='input'>
                                <span>Net Salary:</span>
                                <input type='number'
                                    {...register('netSalary',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Release Date:</span>
                                <input type='date'
                                    {...register('releaseDate',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                        </div>
                        {/* Col 2 */}
                        <div className='form_col'>
                            <div className='input'>
                                <span>Basic Pay:</span>
                                <input type='number'
                                    {...register('basicPay',
                                        {
                                            required: "Period is Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Teaching Pay:</span>
                                <input type='number'
                                    {...register('teachingPay',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Over Time Pay:</span>
                                <input type='text'
                                    {...register('OTPay',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Sub Pay / Tutorial:</span>
                                <input type='number'
                                    {...register('tutorialPay',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input'>
                                <span>Premium Pay:</span>
                                <input type='number'
                                    {...register('premiumPay',
                                        {
                                            required: "Required"
                                        })} />
                            </div>
                            <div className='input input_total'>
                                <span>Total Earnings:</span>
                                <input type='number' />
                            </div>
                            <button onClick={handlePrint}>Print Payslip</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EMPPayslip