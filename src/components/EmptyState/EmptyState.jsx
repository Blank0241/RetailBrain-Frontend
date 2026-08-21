export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-3">
      {Icon && (
        <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-mist-400 mb-1">
          <Icon size={22} />
        </div>
      )}
      <h3 className="font-display text-base font-semibold text-mist-100">{title}</h3>
      {description && <p className="text-sm text-mist-400 max-w-sm">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
