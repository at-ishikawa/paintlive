#! /bin/bash

IP=`curl -s inet-ip.info`

end() {
    aws ec2 revoke-security-group-ingress --group-id ${SECURITY_GROUP_ID} --protocol tcp --port 22 --cidr ${IP}/32
    aws ec2 stop-instances --instance-ids ${AWS_INSTANCE_ID}
}

trap 'end' 0 1 2 3 15

aws ec2 authorize-security-group-ingress --group-id ${SECURITY_GROUP_ID} --protocol tcp --port 22 --cidr ${IP}/32

aws ec2 start-instances --instance-ids ${AWS_INSTANCE_ID}
aws ec2 wait instance-running --instance-ids ${AWS_INSTANCE_ID}

ssh -l ${DEPLOY_USER} ${DEPLOY_HOST} "cd ${DEPLOY_DIR}; ${DEPLOY_COMMAND}"
