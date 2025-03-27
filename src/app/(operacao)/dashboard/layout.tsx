import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
    title: "Dashboard"
};


export default function Layout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}