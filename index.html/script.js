function validaSenha(e)
		{
			if ($('#senha').val() != $('#confirma_senha').val())
			{
				e.preventDefault();
				alert('A confirmação da senha não confere com a senha.');
			}
			else
			{
				alert('Cadastro realizado com sucesso.');
			}
		}
		
		const togglePassword = document
            .querySelector('#togglePassword');
        const password = document.querySelector('#senha');
        togglePassword.addEventListener('click', () => {
            // Toggle the type attribute using
            // getAttribure() method
            const type = password
                .getAttribute('type') === 'password' ?
                'text' : 'password';
            password.setAttribute('type', type);
            // Toggle the eye and bi-eye icon
            if (type === 'text')
            {
                togglePassword.classList.remove('bi-eye');
                togglePassword.classList.add('bi-eye-slash');
            }
            else
            {
                togglePassword.classList.remove('bi-eye-slash');
                togglePassword.classList.add('bi-eye');
            }
        });

        const togglePasswordConfirm = document
            .querySelector('#togglePasswordConfirm');
        const passwordConfirm = document.querySelector('#confirma_senha');
        togglePasswordConfirm.addEventListener('click', () => {

            // Toggle the type attribute using
            // getAttribure() method
            const type = passwordConfirm
                .getAttribute('type') === 'password' ?
                'text' : 'password';
            passwordConfirm.setAttribute('type', type);
            // Toggle the eye and bi-eye icon
            if (type === 'text')
            {
                togglePasswordConfirm.classList.remove('bi-eye');
                togglePasswordConfirm.classList.add('bi-eye-slash');
            }
            else
            {
                togglePasswordConfirm.classList.remove('bi-eye-slash');
                togglePasswordConfirm.classList.add('bi-eye');
            }
        });