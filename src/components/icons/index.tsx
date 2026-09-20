import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  withContainer?: boolean
}

// Internal wrapper for consistent SVG structure
function SvgWrapper({
  size = 24,
  withContainer = false,
  className,
  children,
  ...props
}: IconProps) {
  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(!withContainer && className)}
      {...props}
    >
      {children}
    </svg>
  )

  if (withContainer) {
    return (
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-leaf-700 bg-transparent text-leaf-800",
          className
        )}
      >
        {icon}
      </div>
    )
  }

  return icon
}

export function IconNatural(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" opacity={0.2} />
      <path d="M11 20A7 7 0 0 1 4 13c0-3.5 2-7 7-9 3.5 0 8 3 8 8a7 7 0 0 1-8 8Z" />
      <path d="M4 13s3 1 7-4" />
    </SvgWrapper>
  )
}

export function IconFreshDaily(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 5v2" />
      <path d="M14.5 4.5 13 6" />
      <path d="M9.5 4.5 11 6" />
      <path d="M12 13s2-2 4-2" />
    </SvgWrapper>
  )
}

export function IconHygienic(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </SvgWrapper>
  )
}

export function IconPremium(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4z" />
      <circle cx="12" cy="12" r="3" />
    </SvgWrapper>
  )
}

export function IconSmartCut(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <circle cx="12" cy="14" r="7" />
      <path d="M8 8l8-2" />
      <path d="M12 6L9 11" />
    </SvgWrapper>
  )
}

export function IconDigitalPayment(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
      <path d="M10 8h4" />
      <path d="M11 12h2" />
      <path d="M12 8v5" />
    </SvgWrapper>
  )
}

export function IconHomeDelivery(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <rect width="16" height="8" x="2" y="10" rx="2" ry="2" />
      <path d="M18 14h4v4h-4z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="14" cy="18" r="2" />
      <path d="M2 10V6a2 2 0 0 1 2-2h4c1.1 0 2 .9 2 2v4" />
    </SvgWrapper>
  )
}

export function IconCoconut(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4" />
      <path d="M15.5 10A3.5 3.5 0 0 0 12 12" />
    </SvgWrapper>
  )
}

export function IconLeaf(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <path d="M11 20A7 7 0 0 1 4 13c0-3.5 2-7 7-9 3.5 0 8 3 8 8a7 7 0 0 1-8 8Z" />
      <path d="M4 13s3 1 7-4" />
    </SvgWrapper>
  )
}

export function IconSealedStraw(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <path d="M16 2 8 22" />
      <path d="M12 12h5" />
      <path d="M15 9l2 6" />
    </SvgWrapper>
  )
}

export function IconWallet(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </SvgWrapper>
  )
}

export function IconSprig(props: IconProps) {
  return (
    <SvgWrapper {...props} viewBox="0 0 24 12" size={undefined} className={cn("h-3 w-auto", props.className)}>
      <path d="M12 11c-2-3-5-4-8-4 1.5-3 5-4 8 0 3-4 6.5-3 8 0-3 0-6 1-8 4Z" fill="currentColor" stroke="none" />
    </SvgWrapper>
  )
}
