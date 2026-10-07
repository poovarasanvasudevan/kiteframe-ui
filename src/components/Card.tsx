import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  flush?: boolean
}

export function Card({ flush, className, ...props }: CardProps) {
  return <div className={cx('kf-card', flush && 'kf-card--flush', className)} {...props} />
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('kf-card__header', className)} {...props} />
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('kf-card__body', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('kf-card__footer', className)} {...props} />
}

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 className={cx('kf-type', 'kf-type--subtitle', className)} {...props} />
}
