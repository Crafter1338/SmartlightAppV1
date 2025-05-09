import { PasswordInput } from '@/components/ui/password-input';
import { useAuthentication } from '@/contexts/Authentication';
import { useSignIn } from '@/contexts/SignIn';
import { useViewport } from '@/contexts/Viewport';
import { Box, Button, Card, Field, Input, Link, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
  
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
	const { isSm } = useViewport();
	const naviagte = useNavigate();

	const { email, setEmail, password, setPassword } = useSignIn();

	const { verify, signIn } = useAuthentication();

	useEffect(() => {
		verify().then((result: Boolean) => {
			if (result) { naviagte('/dashboard') }
		});
	}, [])

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
						<Card.Title>Anmeldung</Card.Title>
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

						<Button mt={'1em'} disabled={!(email.length > 0 && password.length > 0)} onClick={() => signIn(email, password)}>Anmelden</Button>

						<Text color={'gray.400'}>Noch keinen Account? <Link color={'blue.400'} onClick={() => naviagte('/sign-up')}>Registrieren</Link></Text>
					</Card.Body>
				</Card.Root>
			</Box>
		</>
	);
}