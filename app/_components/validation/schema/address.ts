import {string, object} from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const addressSchema = object().shape({
    street: string().required('Street is required'),
    city: string().required("City is required"),
    zipCode: string().required("Postcode is required"),
    houseNumber: string(),
    flatNumber: string()
})

const resolver = yupResolver(addressSchema)

export { resolver }