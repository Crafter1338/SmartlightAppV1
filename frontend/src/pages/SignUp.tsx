import { PasswordInput } from '@/components/ui/password-input';
import { useSignUp } from '@/contexts/SignUp';
import { useViewport } from '@/contexts/Viewport';
import { Box, Button, Card, Field, Input, Link, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
	const { isSm } = useViewport();
	const naviagte = useNavigate();

	const { email, setEmail, password, setPassword, signUp } = useSignUp();

	return (
		<>
			<Box p={'2em'} width={'100%'} height={'100%'} display={'flex'} flexDir={'column'} gap={'1.5em'}
				alignItems={'center'} justifyContent={isSm? 'start':'center'}
			>
				<Card.Root maxWidth={500} width={'100%'}>
					<Text pl={'1em'} py={'0.75em'} fontSize={'2xl'}><b>Smartlight App</b></Text>
				</Card.Root>

				<Card.Root maxWidth={500} width={'100%'}>
					<Card.Header>
						<Card.Title>Registrierung</Card.Title>
					</Card.Header>

					<Card.Body display={'flex'} flexDir={'column'} gap={'1em'}>
						<Field.Root required>
							<Field.Label>E-mail <Field.RequiredIndicator/></Field.Label>

							<Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='deine-mail@gmail.com'/>

							<Field.ErrorText>Dieses Feld muss ausgefüllt werden.</Field.ErrorText>
						</Field.Root>

						<Field.Root required>
							<Field.Label>Passwort <Field.RequiredIndicator/></Field.Label>

							<PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

							<Field.ErrorText>Dieses Feld muss ausgefüllt werden.</Field.ErrorText>
						</Field.Root>

						<Button mt={'1em'} disabled={!(email.length > 0 && password.length > 0)} onClick={() => signUp()}>Account Beantragen</Button>

						<Text color={'gray.400'}>Schon einen Account? <Link color={'blue.400'} onClick={() => naviagte('/sign-in')}>Anmelden</Link></Text>
					</Card.Body>
				</Card.Root>
			</Box>
		</>
	);
}