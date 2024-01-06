import {string, object} from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const addressSchema = object().shape({
    name: string().required('Name is required'),
    surname: string().required('Surname is required'),
    email: string().email('Not valid email').required('Email is required'),
    street: string().required('Street is required'),
    city: string().required("City is required"),
    postcode: string().required("Postcode is required")
})

const resolver = yupResolver(addressSchema)

export { resolver }