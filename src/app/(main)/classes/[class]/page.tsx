import { PageHeader } from "@/app/components/PageHeader";
import ReturnButton from "@/app/components/ReturnButton";
import ErrorMessage from "@/app/components/ErrorMessage";
import FeaturesGrid from "@/app/components/FeatureGrid";

type ClassPageProps = {
    params: Promise <{
        ch_class: string;
    }>;
};

export default async function ClassPage({ params }: ClassPageProps){

}