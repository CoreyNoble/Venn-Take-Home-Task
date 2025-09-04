# Venn - Take Home Task - Corey Noble

## Overview

This project is a React-based onboarding form application, built as part of a take-home task. It demonstrates modern React patterns, strong TypeScript usage, and a focus on accessibility and maintainability.

## Technologies Used

- **React 19**: Functional components and hooks for UI logic.
- **TypeScript**: Type safety across the codebase.
- **Vite**: Fast development server and build tool.
- **Sass (SCSS)**: Modular and maintainable component styling.
- **Jest & React Testing Library**: Unit and integration testing.
- **ESLint & Prettier**: Code quality and formatting.
- **Vite Plugins**: Includes `@vitejs/plugin-react` and `vite-plugin-prettier-format` for enhanced DX.

## Patterns

- **Component-based Architecture**: UI is split into reusable components ([`Card`](src/components/Card/Card.tsx), [`OnboardingForm`](src/components/OnboardingForm/OnboardingForm.tsx)).
- **Hooks for State Management**: Uses `useState` and `useRef` for form state and input handling.
- **Form Validation**: Validation logic is encapsulated in helper functions within the form component.
- **API Integration**: Uses `fetch` for server-side validation and submission.
- **Testing**: Each component has corresponding tests using React Testing Library and Jest ([`OnboardingForm.test.tsx`](src/components/OnboardingForm/OnboardingForm.test.tsx), [`Card.test.tsx`](src/components/Card/Card.test.tsx)).
- **SCSS Modules**: Each component has its own SCSS file for scoped styling.

---

## Installation

1. **Clone the repository**
   ```sh
   gh repo clone CoreyNoble/Venn-Take-Home-Task
   cd Venn-Take-Home-Task
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

## Usage

**Development**

Start the development server:

```sh
npm run dev
```

Open http://localhost:5173 in your browser.

**Linting**
```sh
npm run lint
```

**Running Tests**
```sh
npm test
```

**Build**

To build for production:
```sh
npm run build
```

**Preview Production Build**
```sh
npm run preview
```

## Licence

This project is for demonstration purposes only.