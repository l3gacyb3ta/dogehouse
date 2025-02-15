import { User } from "@dogehouse/kebab";
import React, { useContext } from "react";
import { useTypeSafeMutation } from "../../shared-hooks/useTypeSafeMutation";
import { NativeSelect } from "../../ui/NativeSelect";
import { WebSocketContext } from "../ws/WebSocketProvider";

interface PrivacySettingFormProps {}

export const PrivacySettingForm: React.FC<PrivacySettingFormProps> = ({}) => {
  const { mutateAsync } = useTypeSafeMutation("userUpdate");
  const { conn, setUser } = useContext(WebSocketContext);
  const { user } = conn!;
  return (
    <div>
      <div className="text-primary-100 mb-2">Whispers:</div>
      <NativeSelect
        value={user.whisperPrivacySetting}
        onChange={(e) => {
          const whisperPrivacySetting = e.target
            .value as User["whisperPrivacySetting"];
          setUser({ ...user, whisperPrivacySetting });
          mutateAsync([{ whisperPrivacySetting }]);
        }}
      >
        {["on", "off"].map((v) => (
          <option value={v} key={v}>
            {v}&nbsp;&nbsp;&nbsp;
          </option>
        ))}
      </NativeSelect>
    </div>
  );
};
