import { ButtonLink } from '@/components/ui/button';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function Home() {
    return (
        <Card>
            <CardHeader title='홈' description='서비스 소개 + 사용 방법 + 가이드 링크 영역' />
            <CardBody>
                <div className='flex flex-wrap gap-2'>
                    <ButtonLink href='/reading' variant='primary'>리딩 시작</ButtonLink>
                    <ButtonLink href='/guides' variant='secondary'>가이드 보기</ButtonLink>
                </div>
            </CardBody>
        </Card>
    );
}
