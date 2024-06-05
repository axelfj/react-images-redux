# Images React Project

A simple Redux-powered image gallery application that fetches images from the [Picsum Photos API](https://picsum.photos/), allows users to select images, and upload new images from their local environment.

## Features

- Fetch and display a list of images from the Picsum Photos API.
- Select and display individual images.
- Upload new images from the local hard drive.
- Responsive design: Fits to the screen without vertical/horizontal scrolling.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for managing application state.
- **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **styled-components**: A CSS-in-JS library for styling React components.
- **fetch API**: A modern interface for fetching resources asynchronously across the network.

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/redux-image-gallery.git
```

2. Install dependencies:

```bash
cd redux-image-gallery
npm install
```

### Running the Application

```bash
npm start
```

This will start the development server and open the application in your default web browser.

## Folder Structure

```
images-react-project/
│
├── src/
│   ├── components/
│   │   ├── ImageList/
│   │   │   └── ImageList.tsx
│   │   ├── ImageViewer/
│   │   │   └── ImageViewer.tsx
│   │   └── ...
│   ├── store/
│   │   ├── slices/
│   │   │   └── imageSlice.ts
│   │   ├── store.ts
│   │   └── ...
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any bugs or have suggestions for improvements.

## License

This project is NOT licensed, yet.
