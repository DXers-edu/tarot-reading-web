import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { SpreadKey } from '@/lib/tarot/types';

interface Props {
    params: Promise<{ key: SpreadKey }>;
}

export default async function SpreadDetail ({ params }: Props) {

    const { key } = await params;

    return (
        <Card>
            <CardHeader title={key} description={`${key}의 자세한 설명이 표현됩니다.`} />
            <CardBody>
                <div>
                    이 부분에 {key}의 자세한 설명이 나타납니다.
                </div>
            </CardBody>
        </Card>
    )
}