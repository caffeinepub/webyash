import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Package {
    features: Array<string>;
    name: string;
    description: string;
    isPopular: boolean;
    price: bigint;
}
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone?: string;
}
export interface Testimonial {
    clientName: string;
    company: string;
    message: string;
    rating: bigint;
}
export interface backendInterface {
    addPackage(name: string, description: string, price: bigint, features: Array<string>, isPopular: boolean): Promise<void>;
    addTestimonial(clientName: string, company: string, message: string, rating: bigint): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllPackages(): Promise<Array<Package>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getPackage(packageName: string): Promise<Package | null>;
    getPopularPackages(): Promise<Array<Package>>;
    initialize(): Promise<void>;
    submitContact(name: string, email: string, phone: string | null, message: string): Promise<void>;
}
