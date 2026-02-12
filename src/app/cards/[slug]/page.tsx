import { Card, CardBody, CardHeader } from '@/components/ui/card';

interface Props {
    params: Promise<{ slug: string }>
}

export default async function CardDetail({ params }: Props) {

    const { slug } = await params;

    return (
        <Card>
            <CardHeader title={slug} description={`${slug}의 자세한 설명이 표현됩니다.`} />
            <CardBody>
                <div>
                    이 부분에 {slug}의 자세한 설명이 나타납니다.
                </div>
            </CardBody>
        </Card>
    )
}