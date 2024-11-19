import useModal from "@/hooks/useModal";

export default function GeneralContent() {
  const { plugin } = useModal();

  return (
    <div>
      <div
        className="product-des"
        dangerouslySetInnerHTML={{ __html: plugin?.description as string }}
      />
    </div>
  );
}
