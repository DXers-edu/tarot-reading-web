import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function Guides() {
    return (
        <Card>
            <CardHeader title='가이드' description='타로 카드 리딩에 대한 가이드를 표현합니다.' />
            <CardBody>
                <div>
                    이 부분에 타로 리딩에 대한 가이드가 옵니다.
                </div>
            </CardBody>
        </Card>
    )
}
