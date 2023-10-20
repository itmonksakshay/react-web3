export function SocialLink({ link, target = "_blank", icon, className }) {
  return (
    <a href={link} target={target} className={className}>
      {icon}
    </a>
  );
}
