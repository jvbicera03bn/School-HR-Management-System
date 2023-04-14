import { useForm } from "react-hook-form"

const EMPRequirements = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const errStyle = {
        borderColor: "red",
    }
    function onSubmit(data) {
        console.log(data)
    }
    return (
        <div className='EMPRequirements'>
            <div className='requirementsForm'>
                <h1>Requirements Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <select style={errors.requestType && errStyle}
                            {...register
                                ("requestType", {
                                    required: "Type of Request is required"
                                })}>
                            <option disable hidden value="">Type of Request*</option>
                            <option value="Maternity">Maternity</option>
                            <option value="Paternit">Paternit</option>
                            <option value="Annual">Annual</option>
                            <option value="Sick">Sick</option>
                            <option value="Bereavement">Bereavement</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Casual">Casual</option>
                            <option value="Compensatory">Compensatory</option>
                        </select>
                        <p className='err'>{errors.requestType && errors.requestType.message}</p>
                    </div>
                    <div >
                        <input style={errors.numberOfDays && errStyle}
                            {...register('numberOfDays',
                                {
                                    required: "Number of Days is Required",
                                    pattern: {
                                        value: /^[0-9]+$/g,
                                        message: "Only Numbers are allowed"
                                    }
                                })}
                            placeholder='Number of Days*'
                        />
                        <p className='err'>{errors.numberOfDays && errors.numberOfDays.message}</p>
                    </div>
                    <div >
                        <label>Requirement</label>
                        <input 
                        type="file"
                            style={errors.reqFile && errStyle}
                            {...register('reqFile',
                                {
                                    required: "Number of Days is Required",
                                })}
                            placeholder='Requirement File*'
                        />
                        <p className='err'>{errors.reqFile && errors.reqFile.message}</p>
                    </div>
                    <input type="submit" value="Submit Leave" />
                </form>
            </div>
            <div className='requestTable'>

            </div>
        </div>
    )
}

export default EMPRequirements