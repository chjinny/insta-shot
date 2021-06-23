import cv2
import mediapipe as mp


def correct(img):
    with mp.solutions.pose.Pose(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5) as pose:

        leg_ys = []

        H, W = img.shape[:2]
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = pose.process(img)
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

        output = img.copy()

        if results.pose_landmarks:
            leg_y_now = (results.pose_landmarks.landmark[23].y + results.pose_landmarks.landmark[24].y) / 2 * H
            leg_ys.append(leg_y_now)

            leg_y_avg = int(leg_y_now)
            if len(leg_ys) > 10:
                leg_y_avg = int(sum(leg_ys[-10:]) / 10)

            img_long = cv2.resize(img[leg_y_avg:], dsize=None, fx=1.0, fy=1.3)
            #img_long = cv2.resize(img_long[:int(img_long.shape[0] * 0.75)], dsize=(W, H - leg_y_avg))
            #output[leg_y_avg:] = img_long

            output = cv2.vconcat([output[:leg_y_avg],img_long])
        
        return output

if __name__ == "__main__":
    path = "./img/test.jpg"
    src = cv2.imread(path)
    dst = correct(src)
    #view = cv2.hconcat([src,dst])
    #cv2.imwrite("./img/result.jpg", view)
    cv2.imwrite("./img/result.jpg", dst)
