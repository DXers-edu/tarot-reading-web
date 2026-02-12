import { Card, CardBody, CardHeader } from '@/components/ui/card'

export default function Cards() {
    return (
        <Card>
            <CardHeader title='카드 리스트' description='타로 카드의 리스트를 표현합니다.' />
            <CardBody>
                <div>
                    이 부분에 카드 리스트가 표시됩니다.
                </div>
            </CardBody>
        </Card>
    )
}
