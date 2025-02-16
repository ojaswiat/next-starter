import type { TMessage } from "@/lib/types";

import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export default async function ResetPassword(props: {
    searchParams: Promise<TMessage>;
}) {
    const searchParams = await props.searchParams;

    return <ResetPasswordForm searchParams={searchParams} />;
}
