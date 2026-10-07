import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react'
import { cx } from '../utils/cx'

type LinkTone = 'accent' | 'danger' | 'muted' | 'inherit'

type Shared = {
  tone?: LinkTone
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export type LinkAsAnchor = Shared & AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' }
export type LinkAsButton = Shared & ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' }
export type LinkProps = LinkAsAnchor | LinkAsButton

/** Text action link (Edit Profile, View details, Approve). */
export const Link = forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(function Link(
  props,
  ref,
) {
  const { tone = 'accent', leftIcon, rightIcon, className, children, ...rest } = props
  const classes = cx('kf-link', tone !== 'accent' && `kf-link--${tone}`, className)

  if ('as' in rest && rest.as === 'button') {
    const { as: _as, ...buttonProps } = rest as Omit<LinkAsButton, 'tone' | 'leftIcon' | 'rightIcon' | 'className' | 'children'>
    return (
      <button ref={ref as Ref<HTMLButtonElement>} type="button" className={classes} {...buttonProps}>
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    )
  }

  const { as: _as, ...anchorProps } = rest as Omit<LinkAsAnchor, 'tone' | 'leftIcon' | 'rightIcon' | 'className' | 'children'>
  return (
    <a ref={ref as Ref<HTMLAnchorElement>} className={classes} {...anchorProps}>
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  )
})
