/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>ROSTER</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="me-auto">
          {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
          <Link passHref href="/teams/view">
            <Nav.Link>Teams</Nav.Link>
          </Link>
          <Link passHref href="/members/view">
            <Nav.Link>Members</Nav.Link>
          </Link>
          <Link passHref href="/teams/new">
            <Nav.Link>New Club</Nav.Link>
          </Link>
          <Link passHref href="/members/new">
            <Nav.Link>New Member</Nav.Link>
          </Link>
          <Link passHref href="/profile">
            <Nav.Link>Profile</Nav.Link>
          </Link>
        </Nav>
      </Container>
      <SearchBar />
      <Button variant="danger" className="mx-3" onClick={signOut}>Sign Out</Button>
    </Navbar>
  );
}
