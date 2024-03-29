import {string, object, number} from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = object().shape({
    content: string().required('Content description is required'),
    weight: number().required('Cargo weight is required').typeError('Weight must be a number'),
    srcPortId: number().required('Source port is required').typeError('Source port is required'),
    dstPortId: number().required('Destination port is required').typeError('Destination port is required')
})

const resolver = yupResolver(schema)

export { resolver }