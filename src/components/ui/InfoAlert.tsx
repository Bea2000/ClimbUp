'use client';

import { Info } from "@phosphor-icons/react";
import Link from "next/link";

interface InfoAlertProps {
  title: string;
  description: string;
  buttonText: string;
  link: string;
}
export default function InfoAlert({ title, description, buttonText, link }: InfoAlertProps) {
  return (
    <div role="alert" className="alert rounded-lg bg-gray-800 p-4 text-white shadow-lg">
      <Info size={32} />
      <div>
        <h3 className="font-bold">{title}</h3>
        <div className="text-xs">{description}</div>
      </div>
      <Link className="btn btn-sm bg-gray-700 px-8" href={link}>{buttonText}</Link>
    </div>
  )
}
