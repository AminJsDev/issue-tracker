"use client";

import Spinner from "@/app/components/Spinner";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues/list");
      router.refresh();
    } catch (err) {
      setDeleting(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            <IoTrashOutline />
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleDeleteIssue}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error} onOpenChange={setError}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            this issue could not be deleted.
          </AlertDialog.Description>
          <Button
            onClick={() => setError(false)}
            mt="2"
            color="gray"
            variant="soft"
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
