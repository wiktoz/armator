import {string, object, number, array} from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = object().shape({
    startDate: string().required('Start date is required'),
    endDate: string().required('End date is required'),
    routeLength: number(),
    loadsNumber: number(),
    shipId: number().required('Ship must be picked'),
    srcPortId: number().required('Source port is required').typeError('Source port is required'),
    dstPortId: number().required('Destination port is required').typeError('Destination port is required'),
    workersIds: array().required('At least one worker must be on a cruise')
})

const resolver = yupResolver(schema)

export { resolver }